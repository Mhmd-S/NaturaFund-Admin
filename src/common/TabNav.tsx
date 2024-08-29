import React from "react";

const TabNav = ({ tabs, currentTab, setCurrentTab }) => {
    return (
        <ul className="w-fit flex gap-6 border-b" aria-label="Tabs">
            {tabs.map((tab) => {
                return (
                    <li
                        key={tab}
                        href="#"
                        className={`h-fulll shrink-0 border-b-2 px-1 pb-4 text-sm font-medium cursor-pointer ${
                            currentTab === tab
                                ? " text-brand-800 border-brand-800"
                                : "border-b-transparent text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab}
                    </li>
                );
            })}
        </ul>
    );
};

export default TabNav;
