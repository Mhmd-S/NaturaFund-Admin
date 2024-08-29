 import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const NewsItem = ({ newsItem }) => {
    return (
        <div className="w-full px-3 py-2 grid grid-cols-2 grid-rows-2 gap-1 border-b-[1px] border-gray-light text-md rounded-t-lg cursor-pointer hover:bg-brand-50">
            <p className="row-span-2 row-start-1 col-start-1 ">
                <FontAwesomeIcon
                    className="animate-pulse text-brand-900 pr-1"
                    icon={faExclamation}
                />
                {newsItem.title}
            </p>
            <p className="col-start-1 text-gray-med text-xs">{newsItem.content}</p>
            <p className="justify-self-end text-gray-med text-xs">{newsItem.date}</p>
        </div>
    );
};

export default NewsItem;
