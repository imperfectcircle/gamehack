export default function InputText({
    // type,
    // field,
    // onChange,
    // value,
    // placeholder,
    field,
    ...props
}) {
    return (
        <input
            type={props.type}
            {...props}
            {...field}
            // name={field}
            // id={field}
            // onChange={onChange}
            // value={value}
            // placeholder={placeholder}
            required
            className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
        />
    );
}
