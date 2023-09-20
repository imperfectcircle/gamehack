import { useState } from 'react';
import { supabase } from '../Supabase/client';
import Favorites from './Admin/Favorites';
import Profiles from './Admin/Profiles';
import { useEffect } from 'react';

export default function ProfileAdmin() {
    const [data, setData] = useState(null);

    const getData = async () => {
        let { data, error } = await supabase.from('favorites').select();

        const favs = [...new Set(data.map((el) => el.game_name))].map((el) => {
            return {
                id: el,
                label: el,
                value: data.filter((x) => x.game_name === el).length,
            };
        });
        setData(favs);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="mt-24 min-h-screen md:px-24">
            <div>
                <h1 className="mb-12 text-center text-2xl">
                    List of favorites games
                </h1>
                <div className="md:h-[600px]">
                    {data && <Favorites data={data} />}
                </div>
                <h1 className="mb-12 text-center text-2xl">List of users</h1>
                <Profiles />
            </div>
        </div>
    );
}
