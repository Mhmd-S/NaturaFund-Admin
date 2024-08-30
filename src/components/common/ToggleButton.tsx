import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToggleButton = ({ current, handleOnClick, labels, icons }) => {
    return (
        <div
            className="w-fit p-2 rounded-3xl text-white bg-gray-300/25 space-x-1"
            onClick={handleOnClick}
        >
            <button
                className={`px-4 py-2 rounded-3xl ${current ? "bg-white  text-black" : "text-gray-500"}`}
            >
                <FontAwesomeIcon icon={icons[0]} className="pr-1" />
                {labels[0]}
            </button>
            <button
                className={`px-4 py-2 rounded-3xl ${!current ? "bg-white  text-black" : "text-gray-500"}`}
            >
                <FontAwesomeIcon icon={icons[1]} className="pr-1" />
                {labels[1]}
            </button>
        </div>
    );
};

export default ToggleButton;
