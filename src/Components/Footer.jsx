import LanguageSwitcher from './Switchers/LanguageSwitcher';

export default function Footer() {
    return (
        <div className="flex h-12 items-center justify-between bg-slate-400 px-10 text-white dark:bg-slate-800 ">
            <p>
                This site uses{' '}
                <a
                    href="https://rawg.io/apidocs"
                    className="transition-all duration-150 hover:text-orange-600"
                    target="_blank"
                    rel="noreferrer"
                >
                    RAWG api
                </a>{' '}
                to retrieve data
            </p>
            <LanguageSwitcher />
        </div>
    );
}
