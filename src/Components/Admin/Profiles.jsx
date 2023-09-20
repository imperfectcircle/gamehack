import { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/client';
import BanUser from './BanUser';
import Table from '../UI/Table';
import Button from '../UI/Button';

export default function Profiles() {
    const [data, setData] = useState();

    const [page, setPage] = useState(0);

    const getData = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .range(10 * page, page * 10 + 10)
            .order('id', { ascending: true });

        const headers = [
            'Id',
            'Username',
            'Firstname',
            'Lastname',
            'Banned until',
        ];

        const entries = data.map((el) => [
            el.id,
            el.username,
            el.first_name,
            el.last_name,
            <BanUser
                key={el.id}
                user={el.id}
                banned={el.banned_until}
                getData={getData}
            />,
        ]);

        setData({
            headers,
            entries,
        });
    };

    useEffect(() => {
        getData();
    }, [page]);

    return (
        <div>
            {data ? (
                <div className="relative overflow-x-auto ">
                    <div className="shadow-md sm:rounded-lg">
                        <Table headers={data.headers} entries={data.entries} />
                    </div>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="mx-2">
                            {page > 0 && (
                                <Button
                                    onClick={() => setPage((prev) => prev - 1)}
                                    content="Prev"
                                />
                            )}
                        </div>

                        {page}

                        <div className="mx-2">
                            <Button
                                onClick={() => setPage((prev) => prev + 1)}
                                content="Next"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                'Loading'
            )}
        </div>
    );
}
