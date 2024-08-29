import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: Option[];
};

const Dropdown = ({ options }:DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option|null>(null);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const modalContainer = dropdownRef.current;

        const handleClickOutside = (event: MouseEvent) => {
            if (modalContainer && !modalContainer.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
        <div
            ref={dropdownRef}
            className="relative min-w-32 max-w-48 z-10 text-sm flex flex-col items-center bg-white text-gray-med border-[1px] rounded-md"
        >
            <button
                className="w-full flex justify-between px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? selectedOption.label : "Select an option"}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <ul className="absolute top-full z-10 mt-2 w-full rounded-md border border-gray-100 bg-white shadow-lg">
                    {options.map((option) => (
                        <li
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-gray-700"
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;