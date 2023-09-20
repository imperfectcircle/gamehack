import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './Switchers/ThemeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ImExit } from 'react-icons/im';
import { useAuth } from '../Contexts/AuthProvider';
import { supabase } from '../Supabase/client';
import Button from './UI/Button';
import { useTranslation } from 'react-i18next';
import Logo from '../Assets/images/logo.gif';

export default function Navigation() {
    const location = useLocation();
    const [changeNavbarBg, setChangeNavbarBg] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    const { user, signOut } = useAuth();

    const { t } = useTranslation();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setProfile(() => data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) {
            getUserInfo();
        } else {
            setProfile(null);
        }
    }, [user]);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const changeOnScroll = () => {
        if (window.scrollY >= 100) {
            setChangeNavbarBg(true);
        } else {
            setChangeNavbarBg(false);
        }
    };
    window.addEventListener('scroll', changeOnScroll);

    const logOut = () => signOut();

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            {/* Navbar */}
            <nav
                data-navbar
                className={
                    changeNavbarBg
                        ? 'flex h-fit justify-around bg-slate-500 text-white transition-all duration-300 dark:bg-slate-800'
                        : 'flex h-fit justify-around p-5 transition-all duration-300'
                }
            >
                {/* Logo */}
                <div className="p-5">
                    <img src={Logo} alt="" className="w-[100px]" />
                </div>

                {/* Menù */}
                <div
                    data-menu
                    className="hidden space-x-5 text-center lg:col-span-3 lg:flex lg:items-center lg:justify-center"
                >
                    <Link
                        className={
                            location.pathname === '/'
                                ? 'font-bold text-red-500'
                                : 'font-bold duration-200 hover:text-red-500'
                        }
                        to="/"
                    >
                        Home
                    </Link>

                    <Link
                        className={
                            location.pathname === '/search-page'
                                ? 'font-bold text-red-500'
                                : 'font-bold duration-200 hover:text-red-500'
                        }
                        to="/search-page"
                    >
                        {t('common.search')}
                    </Link>
                </div>

                <div className="flex space-x-5">
                    <div className="grid place-items-center">
                        {profile ? (
                            <div className="hidden space-x-3 md:flex">
                                <Link
                                    className="font-bold duration-200 hover:text-red-400"
                                    to="/profile"
                                >
                                    {profile.username}
                                </Link>
                                <button
                                    className="text-2xl font-bold duration-200 hover:text-red-400"
                                    onClick={logOut}
                                >
                                    <ImExit />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <FontAwesomeIcon
                                    className="text-xl duration-200 hover:text-orange-500"
                                    icon={faCircleUser}
                                />
                            </Link>
                        )}
                    </div>
                    <div data-menu className="grid place-items-center lg:flex">
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* Hamburger Button */}
                <div className="flex items-center justify-center lg:hidden">
                    <button
                        id="menu-btn"
                        type="button"
                        onClick={toggleMenuVisibility}
                        className="hamburger block min-w-full focus:outline-none lg:hidden"
                        data-drawer-target="drawer-navigation"
                        data-drawer-show="drawer-navigation"
                        aria-controls="drawer-navigation"
                    >
                        <span
                            data-hamburger
                            className={
                                changeNavbarBg
                                    ? 'hamburger-top bg-white'
                                    : 'hamburger-top bg-black'
                            }
                        ></span>
                        <span
                            data-hamburger
                            className={
                                changeNavbarBg
                                    ? 'hamburger-middle bg-white'
                                    : 'hamburger-middle bg-black'
                            }
                        ></span>
                        <span
                            data-hamburger
                            className={
                                changeNavbarBg
                                    ? 'hamburger-bottom bg-white'
                                    : 'hamburger-bottom bg-black'
                            }
                        ></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menù */}
            {isMenuVisible && (
                <div className="relative z-50 h-screen w-full bg-slate-500 text-white dark:bg-slate-800">
                    <div className="flex flex-col items-center justify-center space-y-10 p-10">
                        <Link
                            className={`text-2xl ${
                                location.pathname === '/'
                                    ? 'font-bold text-red-400'
                                    : 'font-bold duration-200 hover:text-red-400'
                            }`}
                            onClick={toggleMenuVisibility}
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className={`text-2xl ${
                                location.pathname === '/search-page'
                                    ? 'font-bold text-red-400'
                                    : 'font-bold duration-200 hover:text-red-400'
                            }`}
                            onClick={toggleMenuVisibility}
                            to="/search-page"
                        >
                            {t('common.search')}
                        </Link>
                        {profile && (
                            <>
                                <Link
                                    className="text-2xl font-bold duration-200 hover:text-red-400"
                                    to="/profile"
                                    onClick={toggleMenuVisibility}
                                >
                                    {profile.username}
                                </Link>
                                <Button
                                    content="Log out"
                                    onClick={() => {
                                        logOut();
                                        toggleMenuVisibility();
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
