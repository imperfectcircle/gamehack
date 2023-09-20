import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet-async';
import Authentication from '../Components/Authentication';

export default function Root() {
    return (
        <>
            <ScrollRestoration />
            <Authentication>
                <Helmet>
                    <title>Root</title>
                </Helmet>
                <div className="bg-gray-200 pt-[100px] text-slate-800 antialiased dark:bg-slate-700 dark:text-slate-200">
                    <Navigation />
                    <Outlet />
                    <Footer />
                </div>
            </Authentication>
        </>
    );
}
