import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import extractHeader from "@/utils/extractHeader";

const ProjectsTable = ({ data, handleOnClick }) => {
    return (
        <div className="p-4 bg-white rounded-2xl">
            <table className="h-full w-full divide-y-2 divide-gray-200 text-sm">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((header, index) => {
                            return (
                                <th
                                    key={index}
                                    className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                                >
                                    {extractHeader(header)}
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 cursor-default">
                    {data.map((dataEntry, index) => (
                        <tr key={index}>
                            {Object.entries(dataEntry).map(([key, value], index) => (
                                <td
                                    key={index}
                                    className="px-4 py-2 whitespace-nowrap text-gray-900"
                                >
                                    {value}
                                </td>
                            ))}
                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">
                                <button className="px-4 py-2 border-[1px] border-brand-900 rounded-lg text-white bg-brand-900 transition-all hover:bg-white hover:text-brand-900">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsTable;
