import { usePasswordVisibility } from '../../Hooks/usePasswordVisibility';
import EyeIcon from './EyeIcon';

export default function PasswordInput({ field, ...props }) {
    const [passwordIsVisible, togglePasswordVisibility] =
        usePasswordVisibility();

    return (
        <div className="relative flex">
            <input
                {...field}
                {...props}
                // onChange={props.onChange ? props.onChange : () => {}}
                className="w-full rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                type={passwordIsVisible ? 'text' : 'password'}
                // name={props.field}
                // id={props.field}
                // value={props.value}
            />
            <EyeIcon
                passwordIsVisible={passwordIsVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        </div>
    );
}
