import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GameCard from '../Components/GameCard';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        fetch(
            `${
                import.meta.env.VITE_RAWG_API_URL
            }/games?dates=2019-01-01,2019-12-31&page_size=16&ordering=-added&key=${
                import.meta.env.VITE_RAWG_API_KEY
            }`,
        )
            .then((res) => res.json())
            .then((res) => setData(res.results));
        setLoading(false);
    }, []);

    return (
        <div className="mt-16">
            <Helmet>
                <meta name="description" content="Descrizione della pagina" />
                <title>Games Hack - Homepage</title>
            </Helmet>
            <h1 className="mb-10 p-10 text-center text-6xl md:w-1/2">
                {t('home.title')}
            </h1>
            {loading ? (
                <div className="grid h-screen place-items-center">
                    <p className="text-6xl">Caricamento ...</p>
                </div>
            ) : (
                <div className="mx-auto mb-10 grid w-10/12 grid-cols-1 gap-10 md:grid-cols-4">
                    {data &&
                        data.map((game, index) => (
                            <GameCard
                                key={game.id}
                                data={game}
                                className={`${
                                    (index + 1) % 4 === 0
                                        ? 'md:bottom-card rounded-none'
                                        : null
                                }
                            ${index % 4 === 0 ? 'md:top-card' : null}`}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
