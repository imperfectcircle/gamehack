import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import GenresList from '../Components/GenresList';
import GameCard from '../Components/GameCard';

export default function Search() {
    const genres = useLoaderData();

    const { genre } = useParams();
    const { num = 1 } = useParams();

    const [games, setGames] = useState(null);
    const [searched, setSearched] = useState('');
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const page_size = 12;

    useEffect(() => {
        setLoading(true);
        setGames(null);
        setSearched('');
        fetch(
            `${import.meta.env.VITE_RAWG_API_URL}/games?&key=${
                import.meta.env.VITE_RAWG_API_KEY
            }&genres=${genre}&page=${num}&page_size=${page_size}&ordering=-rating`,
        )
            .then((res) => res.json())
            .then((res) => {
                setGames(res);
                setLoading(false);
            });
    }, [genre, num]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            // Verifico se sono stati premuti ctrl e k
            if ((event.ctrlKey || event.metaKey) && event.key === '<') {
                // Attivo il focus sull'input di ricerca
                inputRef.current.focus();
            }
        };
        // Aggiungo un listener per il keydown
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            // Rimuovo il listener quando il componente viene smontato
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const triggerSearch = () => {
        setLoading(true);
        setGames(null);
        fetch(
            `${import.meta.env.VITE_RAWG_API_URL}/games?key=${
                import.meta.env.VITE_RAWG_API_KEY
            }&page_size=24&search=${searched}&ordering=-rating`,
        )
            .then((res) => res.json())
            .then((res) => {
                setGames(res);
                setLoading(false);
            });
    };

    return (
        <div className="flex min-h-screen px-10">
            <div className="flex w-1/5 flex-col">
                <div className="relative pb-5">
                    <input
                        className="w-full rounded-lg shadow-lg focus:bg-emerald-100 dark:text-black dark:focus:bg-emerald-400"
                        type="text"
                        placeholder="CTRL+<"
                        value={searched}
                        onChange={(event) => setSearched(event.target.value)}
                        ref={inputRef}
                    />
                    <AiOutlineSearch
                        onClick={triggerSearch}
                        className="absolute right-[4%] top-[15%] cursor-pointer text-2xl dark:text-black"
                    />
                </div>

                <GenresList genres={genres} genre={genre} />
            </div>
            <div className="w-4/5">
                {games && (
                    <>
                        <div className="mt-5 grid grid-cols-1 gap-10 p-10 md:grid-cols-3">
                            {games.results.map((game, index) => (
                                <GameCard
                                    key={game.id}
                                    data={game}
                                    index={index}
                                    className={`${
                                        (index + 1) % 3 === 0
                                            ? 'md:bottom-card rounded-none'
                                            : null
                                    }
                                        ${
                                            index % 3 === 0
                                                ? 'md:top-card'
                                                : null
                                        }
                                        `}
                                />
                            ))}
                        </div>
                        <div className="mb-12 w-full">
                            {!searched && (
                                <div className="flex justify-center">
                                    <div className="w-48 text-center">
                                        {num > 1 && (
                                            <Link
                                                to={`/search/${genre}/${
                                                    num - 1
                                                }`}
                                            >
                                                prev
                                            </Link>
                                        )}
                                    </div>
                                    <div className="w-48 text-center">
                                        {num}
                                    </div>
                                    <div className="w-48 text-center">
                                        <Link
                                            to={`/search/${genre}/${+num + 1}`}
                                        >
                                            next
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {loading && (
                    <div className="grid place-items-center">
                        <p className="text-6xl font-bold">Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export const getGenres = async () => {
    return await fetch(
        `${import.meta.env.VITE_RAWG_API_URL}/genres?key=${
            import.meta.env.VITE_RAWG_API_KEY
        }`,
    )
        .then((res) => res.json())
        .then((res) => res.results);
};
