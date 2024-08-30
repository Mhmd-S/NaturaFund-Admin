import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type FaqItemProps = {
    question: string;
    answer: string;
};

const FaqItem = ({ question, answer }) => {
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">{question}</h2>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                />
            </summary>

            <p className="mt-4 px-4 leading-relaxed text-gray-700">{answer}</p>
        </details>
    );
};

export default FaqItem;
