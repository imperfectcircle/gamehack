import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../Constants/index';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
    };

    return (
        <div className="flex space-x-3">
            {LANGUAGES.map((el) => (
                <span
                    className={`cursor-pointer uppercase ${
                        el.code === i18n.resolvedLanguage
                            ? 'font-bold text-orange-400'
                            : ''
                    }`}
                    key={el.code}
                    onClick={() => changeLanguage(el.code)}
                >
                    {el.code}
                </span>
            ))}
        </div>
    );
}
