export default function Table({ headers, entries }) {
    return (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {headers.map((el, _) => (
                        <th key={_} scope="col" className="px-6 py-3">
                            {el}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {entries.map((el, _) => (
                    <tr
                        key={'tr' + _}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        {el.map((x, _) => (
                            <td
                                key={'td' + _}
                                scope="col"
                                className="px-6 py-3"
                            >
                                {x}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
