export default function InputLabel({ htmlFor, content }) {
    return (
        <label className="text-xl" htmlFor={htmlFor}>
            {content}
        </label>
    );
}
