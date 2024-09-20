import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "@components/common/ProjectCard";
import SearchBar from "@components/common/SearchBar";
import * as projectApi from "@api/project";
import EmptyState from "@components/common/EmptyState";
import { faMeh } from "@fortawesome/free-solid-svg-icons";

// ToDo: CHange the Card and implement the data updating

const filterOptions = [
    {
        type: "Duration",
        options: [
            {
                label: "1 Year",
                value: "1",
            },
            {
                label: "2 Years",
                value: "2",
            },
            {
                label: "3 Years",
                value: "3",
            },
            {
                label: "4 Years",
                value: "4",
            },
            {
                label: "5 Years",
                value: "5",
            },
        ],
    },
    {
        type: "Return",
        value: "solar",
    },
    {
        label: "Wind",
        value: "wind",
    },
    {
        label: "Hydro",
        value: "hydro",
    },
];

const Explore = () => {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [errors, setErrors] = useState<String | null>(null);
    const [stopFetching, setStopFetching] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const container = containerRef.current;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!stopFetching) {
                    fetchProjects();
                }
            }
        }, options);

        if (container) {
            observer.observe(container);
        }

        return () => {
            observer.disconnect();
        };
    }, [stopFetching, page]);

    useEffect(() => {
        const filtered = projects.filter((project) =>
            Object.values(project).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredProjects(filtered);
    }, [searchText, projects]);

    const fetchProjects = async () => {
        if (stopFetching) {
            return;
        }

        setIsLoading(true);
        const res = await projectApi.getProjects(page);
        if (res.status === "success") {
            if (res.data.length === 0) {
                setStopFetching(true);
                setIsLoading(false);
                return;
            }

            setProjects((prevProjects) => prevProjects.concat(res.data));
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
            return;
        }

        setErrors("Could not fetch projects");
        setIsLoading(false);
    };

    return (
        <div className="w-full h-full p-6 bg-gray-300/20 space-y-6 overflow-y-auto">
            <div className="w-full p-4 flex justify-between items-center bg-white rounded-2xl">
                <h2 className="text-lg font-bold text-brand-900">Explore</h2>
                <div className="w-1/3">
                    <SearchBar searchText={searchText} setSearchText={setSearchText} />
                </div>
            </div>
            <div
                className="w-full min-h-screen p-4 grid grid-cols-1 grid-flow-row place-items-center gap-8 bg-white rounded-2xl"
                ref={containerRef}
            >
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard project={project} key={index} />
                    ))
                ) : (
                    <EmptyState title="Nothing to display" icon={faMeh} />
                )}
            </div>
        </div>
    );
};

export default Explore;
