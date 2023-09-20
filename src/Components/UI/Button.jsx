export default function Button({ onClick, content }) {
    return (
        <button
            type="submit"
            className="rounded-full border-2 border-orange-500 px-6 py-3 shadow-lg transition-all duration-150 hover:bg-orange-500 hover:text-white dark:hover:text-black"
            onClick={onClick}
        >
            {content}
        </button>
    );
}
