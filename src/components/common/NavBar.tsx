import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useResponsive from "@/hooks/useResponsive";
import { stopScrolling, allowScrolling } from "@/utils/scrollingControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faChevronDown, faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const { isMobile } = useResponsive();

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (!showMenu) {
            stopScrolling();
        } else {
            allowScrolling();
        }
    };

    useEffect(() => {
        if (!isMobile) setShowMenu(false);
    }, [isMobile]);

    return (
        <div
            className={`relative w-screen p-2 flex items-center ${showMenu && "grid grid-cols-1 grid-rows[15%_85%]"} bg-white md:border-b-[1px] md:p-0`}
        >
            <h1 className="h-fit pt-3 font-serif text-brand-800 text-xl md:py-2 md:flex md:items-center md:text-3xl md:border-r-[1px] md:border-r-brand-800 md:px-6">
                NaturaFund
                <FontAwesomeIcon icon={faLeaf} className="ml-3" />
            </h1>
            <div
                className={`absolute py-4 w-full h-screen grid grid-cols-1 grid-rows-[80%_20%] place-items-start transition-all top-12 bg-white ${showMenu ? "left-0" : "left-[25rem]"} md:static md:grid md:grid-cols-[30%_70%] md:grid-rows-1 md:justify-items-start md:justify-start md:px-6  md:h-min md:top-0`}
            >
                <div className="w-full h-full flex flex-col items-center md:flex-row md:justify-evenly">
                    <a className="w-full flex items-center justify-between py-2 px-12 cursor-pointer md:w-fit md:px-4 md:justify-center md:rounded-3xl md:hover:text-white md:hover:bg-brand-800 md:transition-colors ">
                        Invest
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2 md:hidden" />
                    </a>
                    <a className="w-full flex items-center justify-between py-2 px-12 cursor-pointer md:w-fit md:px-4 md:justify-center md:rounded-3xl md:hover:text-white md:hover:bg-brand-800 md:transition-colors ">
                        Learn
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2 md:hidden" />
                    </a>
                    <a className="w-full h-fit flex items-center justify-between py-2 px-12 cursor-pointer md:w-fit md:px-4 md:justify-center md:rounded-3xl md:hover:text-white md:hover:bg-brand-800 md:transition-colors ">
                        About
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2 md:hidden" />
                    </a>
                </div>
                <div className="w-full pt-6 flex items-center justify-evenly border-t-2 md:w-2/3 md:pt-0 md:pr-8 md:border-t-0 md:justify-end md:justify-self-end">
                    <Link to="login" className="w-2/5 rounded-md border-2 transition-all border-brand-800 text-brand-800 p-2 md:border-0 hover:text-brand-900 md:w-1/5 md:mr-6">
                        Log In
                    </Link>
                    <Link to="registration" className="w-2/5 rounded-md transition-all bg-brand-800 p-2 border-2 text-white hover:text-brand-800 md:w-1/5  md:transition-all md:hover:bg-white md:border-brand-800">
                        Sign Up
                    </Link>
                </div>
            </div>
            <button
                className="absolute w-fit h-fit p-3 mr-4 top-2 right-0 rounded-2xl text-brand-800 md:hidden"
                onClick={toggleMenu}
            >
                <FontAwesomeIcon icon={showMenu ? faClose : faBars} className="ml-2 text-2xl" />
            </button>
        </div>
    );
};

export default NavBar;
