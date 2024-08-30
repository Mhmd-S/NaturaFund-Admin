import React from "react";

const Footer = () => {
    return (
        <div className="w-full md:py-10 md:px-16 grid grid-cols-3 grid-row-3 gap-3">
            <p className="md:text-xl font-semibold">Contact</p>
            <p className="md:text-xl font-semibold">Other resources</p>
            <p className="md:text-xl font-semibold">Legal</p>
            <div className="flex flex-col w-fit text-sm">
                <a className="cursor-pointer hover:text-brand-700 py-2">Contact Us</a>
                <a className="cursor-pointer hover:text-brand-700 py-2">About Us</a>
            </div>
            <div className="flex flex-col w-fit text-sm">
                <a className="cursor-pointer hover:text-brand-700 py-2">FAQ</a>
                <a className="cursor-pointer hover:text-brand-700 py-2">Insights</a>
                <a className="cursor-pointer hover:text-brand-700 py-2">News</a>
            </div>
            <div className="flex flex-col w-fit text-sm">
                <a className="cursor-pointer hover:text-brand-700 py-2">Privacy Policy</a>
                <a className="cursor-pointer hover:text-brand-700 py-2">Terms and Conditions</a>
            </div>
            <div className="row-start-3 col-span-3">&copy; 2021 NaturaFund. All rights reserved.</div>
        </div>
    );
};

export default Footer;
