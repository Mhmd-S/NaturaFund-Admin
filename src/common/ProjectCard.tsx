import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel, faCalendarAlt, faDollar } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <article className="rounded-xl bg-white p-4 ring-1 ring-indigo-50 sm:p-6 lg:p-8 cursor-pointer hover:ring-indigo-500">
            <div className="flex items-start sm:gap-8">
                <div
                    className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500 "
                    aria-hidden="true"
                >
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faSolarPanel} className="text-indigo-500" />
                    </div>
                </div>

                <div>
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 mr-2 text-[10px] font-medium text-white">
                        Solar
                    </strong>
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 mr-2 text-[10px] font-medium text-white">
                        Equity
                    </strong>

                    <div className="mt-4 text-lg font-medium sm:text-xl">
                        <h3 href="#" className="hover:underline">
                            Penang Solar Farm Inc.
                        </h3>
                        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                            By UNESCO Solar Farms
                        </p>
                    </div>

                    <p className="mt-1 text-sm text-gray-700">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nulla amet
                        voluptatum sit rerum, atque, quo culpa ut necessitatibus eius suscipit eum
                        accusamus, aperiam voluptas exercitationem facere aliquid fuga. Sint.
                    </p>

                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-500" />
                            <p className="text-xs font-medium">15/12/2019 Closing Date</p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                            &middot;
                        </span>

                        <div className="flex items-center gap-2 text-gray-500">
                            <FontAwesomeIcon icon={faDollar} className="text-indigo-500" />
                            <p className="text-xs font-medium">$150,000 Investment Target</p>
                        </div>

                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
