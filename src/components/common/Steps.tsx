import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheck } from "@fortawesome/free-solid-svg-icons";

const Steps = ({ steps, currentStep }) => {
    const isPastStatus = (index, steps) => {
        return index < steps.findIndex((item) => item === currentStep);
    };

    return (
            <ol className="h-full flex flex-col gap-2 text-md font-medium text-gray-500 sm:gap-4">
                {steps.map((step, index) => (
                    <li key={step} className="relative mt-4 flex items-center">
                        <div
                            className={`${index + 1 == steps.length && "hidden"} ${isPastStatus(index, steps) ? "bg-green-600" : "bg-gray-300"} absolute w-[1px] h-14 top-1/2 left-5`}
                        />
                        <span className="flex items-center justify-center mr-2 size-10 rounded-full bg-gray-50 text-center text-lg font-bold z-10">
                            {step === currentStep ? (
                                <FontAwesomeIcon icon={faCircle} className="text-blue-600" />
                            ) : isPastStatus(index, steps) ? (
                                <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                            ) : null}
                        </span>
                        <span
                            className={`hidden sm:block ${
                                step === currentStep
                                    ? "text-blue-500"
                                    : isPastStatus(index, steps)
                                      ? "text-green-600"
                                      : "text-gray-500"
                            }`}
                        >
                            {step}
                        </span>
                    </li>
                ))}
            </ol>
    );
};

export default Steps;
