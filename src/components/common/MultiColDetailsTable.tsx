import React from "react";

const MultiColDetailsTable = ({ title, data }) => {
    console.log(data);
    // Extract headers
    const headers = Object.keys(data);

    // Extract rows
    const rows = Object.keys(data[headers[0]]).map((key) => {
        let row = { scenario: key };
        headers.forEach((header) => {
            row[header] = data[header][key];
        });
        return row;
    });

    console.log(headers);
    console.log(rows);

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
            <table className="min-w-full divide-y-2 divide-gray-100 bg-white text-sm  py-3 ">
                <thead className="text-left">
                    <tr>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
                        >
                            Scenario
                        </th>
                        {headers.map((header) => (
                            <th
                                scope="col"
                                className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
                                key={header}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-left">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-gray-50">
                            <th scope="row" className="hitespace-nowrap px-4 py-3 text-gray-700">
                                {row.scenario}
                            </th>
                            {headers.map((header) => (
                                <td
                                    key={header}
                                    className="hitespace-nowrap px-4 py-3 text-gray-700"
                                >
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MultiColDetailsTable;
