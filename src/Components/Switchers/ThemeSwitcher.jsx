import { useState } from 'react';

import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ThemeSwitcher() {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark'),
    );

    const handleThemeChange = () => {
        setIsDark((isDark) => !isDark);

        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };
    return (
        <>
            <span onClick={handleThemeChange}>
                {isDark ? (
                    <FontAwesomeIcon
                        className="text-xl duration-200 hover:text-orange-500"
                        icon={faSun}
                    />
                ) : (
                    <FontAwesomeIcon
                        className="text-xl duration-200 hover:text-orange-500"
                        icon={faMoon}
                    />
                )}
            </span>
        </>
    );
}
