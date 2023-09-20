import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function EyeIcon({
    passwordIsVisible,
    togglePasswordVisibility,
}) {
    return (
        <>
            {passwordIsVisible ? (
                <AiOutlineEyeInvisible
                    onClick={togglePasswordVisibility}
                    className="absolute right-[4%] top-[28%] cursor-pointer dark:text-black"
                />
            ) : (
                <AiOutlineEye
                    onClick={togglePasswordVisibility}
                    className="absolute right-[4%] top-[28%] cursor-pointer dark:text-black"
                />
            )}
        </>
    );
}
