export default function GenresList({ genres, searchParams, setSearchParams }) {
    const handleChange = (slug) => {
        const allParams = Object.fromEntries([...searchParams]);

        setSearchParams({
            ...allParams,
            genres: slug,
        });
    };
    return (
        <>
            <p className="mb-4 text-xl">Genres</p>
            <div className="flex flex-wrap gap-3 md:block md:h-72 md:overflow-y-scroll md:p-2 md:scrollbar-thin md:scrollbar-track-slate-100 md:scrollbar-thumb-slate-500">
                {genres.map((el) => {
                    return (
                        <div
                            onClick={() => handleChange(el.slug)}
                            className={`${
                                searchParams.get('genres') === el.slug
                                    ? 'rounded-md bg-orange-500 px-3 font-bold text-white md:px-0 md:pl-5'
                                    : ''
                            } cursor-pointer`}
                            key={el.id}
                        >
                            <p
                                className={
                                    searchParams.get('genres') !== el.slug
                                        ? 'tracking-widest transition-all duration-150 hover:font-bold hover:text-orange-700 dark:hover:text-orange-500'
                                        : ''
                                }
                            >
                                {el.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
