import React from "react";
import Steps from "@/components/common/Steps";

const STATUSES = [
    {
        title: "Planning",
        description: "Project is in the planning stage. Details are being fleshed out.",
    },
    {
        title: "Funding",
        description: "Project is currently waiting for funding.",
    },
    {
        title: "Execution",
        description: "Project is being being built and developed.",
    },
    {
        title: "Electricity Generated",
        description: "The project started generating electricity.",
    },
];

const Status = ({ status }) => {
    return (
        <>
            <section className="pl-24">
                <h2 className="text-3xl py-4 font-semibold capatalize">Steps</h2>

                <Steps
                    steps={STATUSES.map((step) => step.title)}
                    currentStep={status.current}
                />
            </section>
            <section className="pr-24">
                <h2 className="text-3xl py-4 font-semibold capatalize">Updates</h2>
                <p>
                    {status.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Cupiditate aliquid quasi eum in est repellat placeat, nostrum, quam, a ab magnam
                    natus. Delectus adipisci aliquid rem corrupti at saepe neque.
                </p>
            </section>
        </>
    );
};

export default Status;
