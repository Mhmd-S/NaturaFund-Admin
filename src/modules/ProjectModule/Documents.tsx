import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const Documents = ({ legal }) => {
    return (
        <div className="col-span-2 w-1/2 justify-self-center">
            <h2 className="text-3xl py-4 font-semibold">Documents</h2>
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {Object.entries(legal).map(([key, value], index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                        <div className="flex w-0 flex-1 items-center">
                            <FontAwesomeIcon
                                icon={faPaperclip}
                                aria-hidden="true"
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium capitalize">{key}</span>
                                <span className="flex-shrink-0 text-gray-400">1.9 mb</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Documents;
