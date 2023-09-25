import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import GenresList from '../Components/GenresList';
import GameCard from '../Components/GameCard';
import StoresList from '../Components/StoresList';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchPage() {
    const { genres, stores } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef(null);

    useEffect(() => {
        const queryString = [...searchParams]
            .map((el) => `&${el[0]}=${el[1]}`)
            .join('');
        fetch(
            `${import.meta.env.VITE_RAWG_API_URL}/games?&key=${
                import.meta.env.VITE_RAWG_API_KEY
            }&page_size=${page_size}&ordering=-rating${queryString}`,
        )
            .then((r) => r.json())
            .then((r) => {
                setGames(r);
            });
    }, [searchParams]);

    const [games, setGames] = useState(null);
    const [searched, setSearched] = useState('');

    const page_size = 12;

    const handlePage = (order) => {
        const allParams = Object.fromEntries([...searchParams]);

        if (order === 'next') {
            setSearchParams({
                ...allParams,
                page: allParams.page ? +allParams.page + 1 : 2,
            });
        } else {
            setSearchParams({
                ...allParams,
                page:
                    allParams.page == 1 || !allParams.page
                        ? 1
                        : +allParams.page - 1,
            });
        }
    };

    useEffect(() => {
        const ctrlK = (event) =>
            (event.ctrlKey || event.metaKey) && event.key === 'k';

        const handleKeyPress = (event) => {
            // Verifico se sono stati premuti ctrl e k
            if (ctrlK(event)) {
                // Attivo il focus sull'input di ricerca
                inputRef.current.focus();
            }
        };

        // Evito il comportamento di default
        const ignore = (event) => {
            if (ctrlK(event)) {
                event.preventDefault();
            }
        };
        // Aggiungo listener per il keyup e il keydown
        document.addEventListener('keyup', handleKeyPress);
        document.addEventListener('keydown', ignore);

        return () => {
            // Rimuovo i listener quando il componente viene smontato
            document.removeEventListener('keyup', handleKeyPress);
            document.removeEventListener('keydown', ignore);
        };
    }, []);

    const handleSearched = () => {
        const allParams = Object.fromEntries([...searchParams]);
        setSearchParams({ search: searched });
    };

    return (
        <div className="mt-16 min-h-screen px-6 md:flex">
            <div className="grid w-full grid-cols-1 md:flex md:w-1/5 md:flex-col">
                <div className="relative pb-5">
                    <input
                        className="w-full rounded-lg shadow-lg focus:bg-emerald-100 dark:text-black dark:focus:bg-emerald-400"
                        type="text"
                        placeholder="CTRL+k"
                        value={searched}
                        onChange={(event) => setSearched(event.target.value)}
                        ref={inputRef}
                    />
                    <AiOutlineSearch
                        onClick={handleSearched}
                        className="absolute right-[4%] top-[15%] cursor-pointer text-2xl dark:text-black"
                    />
                </div>
                <GenresList
                    genres={genres}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
                <hr className="my-5 md:my-12" />
                <StoresList
                    stores={stores}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            </div>
            <div className="md:w-4/5">
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

                        <div className="mb-12 flex w-full justify-center">
                            {!(
                                searchParams.get('page') === null ||
                                searchParams.get('page') <= 1
                            ) ? (
                                <div className="w-48 text-center">
                                    <button
                                        className="text-xl hover:text-orange-500"
                                        onClick={() => handlePage('prev')}
                                    >
                                        Prev
                                    </button>
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="w-48 text-center">
                                <span className="text-xl">
                                    {searchParams.get('page') === null
                                        ? 1
                                        : searchParams.get('page')}
                                </span>
                            </div>
                            <div className="w-48 text-center">
                                <button
                                    className="text-xl hover:text-orange-500"
                                    onClick={() => handlePage('next')}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
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
        .then((r) => r.json())
        .then((r) => r.results);
};

export const getStores = async () => {
    return await fetch(
        `${import.meta.env.VITE_RAWG_API_URL}/stores?key=${
            import.meta.env.VITE_RAWG_API_KEY
        }`,
    )
        .then((r) => r.json())
        .then((r) => r.results);
};

export const loadAll = async () => {
    const genres = await getGenres();
    const stores = await getStores();

    return { genres, stores };
};
