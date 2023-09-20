import { Link, useLoaderData } from 'react-router-dom';
import useAuthStore from '../Store/authStore';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import GameChat from '../Components/GameChat/GameChat';
import { supabase } from '../Supabase/client';

export default function GameDetails() {
    const game = useLoaderData();
    const profile = useAuthStore((state) => state.profile);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const isFavorite = () => {
        return profile.favorites.find((el) => el.game_id === game.id);
    };

    const toggleFavorite = async () => {
        const data = await supabase.auth.getSession();
        if (isFavorite()) {
            const { data, error } = await supabase
                .from('favorites')
                .delete()
                .eq('id', isFavorite().id);
        } else {
            const { data, error } = await supabase
                .from('favorites')
                .insert({
                    user_id: profile.id,
                    game_id: game.id,
                    game_name: game.name,
                })
                .select();
        }

        setLoggedIn(data.data.session);
    };

    return (
        <div
            className="mt-16 min-h-screen px-12 py-24"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,1)), url("${game.background_image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="grid grid-cols-1 text-white md:flex">
                <div className="md:w-1/2">
                    <p className="pb-4 text-3xl font-extrabold text-orange-500 md:text-5xl ">
                        {game.name}
                    </p>
                    <p className="pb-4 text-lg">
                        {`Developed by: ${game.developers.map(
                            (developer) => developer.name,
                        )}`}
                    </p>

                    {profile && (
                        <div className="my-12" onClick={toggleFavorite}>
                            <BsFillArrowThroughHeartFill
                                className={`text-4xl
                                    ${
                                        isFavorite()
                                            ? 'text-red-500'
                                            : 'text-white'
                                    }
                                `}
                            />
                        </div>
                    )}

                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                    ></div>
                </div>

                <div className="md:w-1/2">
                    {profile && <GameChat game={game.id} />}
                </div>
            </div>
            <div className="mt-10 flex flex-col items-center space-y-3 md:flex-row md:items-start md:justify-around">
                <div className="flex flex-col">
                    <p className="text-xl text-orange-300 dark:text-orange-600">
                        Genres
                    </p>
                    {game.genres.map((genre) => (
                        <Link
                            key={genre.id}
                            to={`/search-page?genres=${genre.slug}`}
                            className="ml-2 text-white transition-all duration-150 hover:text-orange-500"
                        >
                            {genre.name}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col">
                    <p className="text-xl text-orange-300 dark:text-orange-600">
                        Platforms
                    </p>
                    {game.platforms.map((platform) => (
                        <p
                            key={platform.platform.id}
                            className="ml-2 text-white"
                        >
                            {platform.platform.name}
                        </p>
                    ))}
                </div>

                <div className="flex flex-col">
                    <p className="text-xl text-orange-300 dark:text-orange-600">
                        Tags
                    </p>
                    {game.tags.slice(0, 5).map((tag) => (
                        <p key={tag.id} className="ml-2 text-white">
                            {tag.name}
                        </p>
                    ))}
                </div>

                <div className="flex flex-col">
                    <p className="text-xl text-orange-300 dark:text-orange-600">
                        Stores
                    </p>
                    {game.stores.map((store) => (
                        <p key={store.id} className="ml-2 text-white">
                            {store.store.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const getGameDetails = async ({ params }) => {
    return await fetch(
        `${import.meta.env.VITE_RAWG_API_URL}/games/${params.id}?key=${
            import.meta.env.VITE_RAWG_API_KEY
        }`,
    )
        .then((r) => r.json())
        .then((r) => {
            return r;
        });
};
