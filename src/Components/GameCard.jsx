import { Link } from 'react-router-dom';

export default function GameCard({ data, className = '' }) {
    return (
        <Link to={`/game/${data.id}`}>
            <div
                className={`
                group relative h-[300px] overflow-hidden rounded-lg rounded-l-none rounded-t-none border-b-2 border-r-2 bg-white p-10 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-orange-500 dark:border-none dark:bg-gray-400 dark:hover:bg-orange-700 ${className}`}
            >
                <p className="mb-5 text-center text-lg group-hover:text-white">
                    {data.name}
                </p>

                <img
                    src={data.background_image}
                    alt={`${data.name} cover picture`}
                    className="h-36 w-full rounded-br-lg object-cover transition-all duration-500 group-hover:scale-[1.2]"
                />
            </div>
        </Link>
    );
}
