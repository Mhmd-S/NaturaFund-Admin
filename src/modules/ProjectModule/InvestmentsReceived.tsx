import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const InvestmentsReceived = () => {
    return (
        <>
            <div className="w-3/4 flex flex-col gap-6">
                <h2 className="col-span-2 text-3xl font-semibold">Received Investments</h2>
                <span id="ProgressLabel" className="sr-only">
                    Investment Recieved
                </span>

                <span
                    role="progressbar"
                    aria-labelledby="ProgressLabel"
                    aria-valuenow="75"
                    className="relative block rounded-full bg-gray-200"
                >
                    <span className="absolute inset-0 flex items-center justify-center text-[10px]/4">
                        <span className="text-lg  text-white"> 75% </span>
                    </span>

                    <span
                        className="block h-6 rounded-full bg-indigo-600 text-center"
                        style={{ width: 75 + "%" }}
                    ></span>
                </span>

                <div className="flex justify-between items-center">
                    <dd className="">Total Investments Received:</dd>
                    <dt className=" text-brand-900">$200,000</dt>
                </div>
                <div className="flex justify-between items-center">
                    <dt className="">Total Investments Pending:</dt>
                    <dd className=" text-brand-900">$100,000</dd>
                </div>
                <div className="flex justify-between items-center">
                    <dt className=" ">Total Investments Approved:</dt>
                    <dd className=" text-brand-900">$100,000</dd>
                </div>
            </div>
            <ol className="overflow-y-auto w-full h-96 p-4 flex flex-col gap-4 border border-gray-200 rounded-lg">
                <li className="relative w-full grid grid-cols-[10%_50%_30%] items-center">
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="rounded-full bg-green-100 p-3 text-green-600"
                    />
                    <p className="text-md  justify-self-center">RM 240.94</p>
                    <p className="text-gray-light text-sm justify-self-end text-right">
                        12/12/2021
                    </p>
                </li>
            </ol>
        </>
    );
};

export default InvestmentsReceived;
