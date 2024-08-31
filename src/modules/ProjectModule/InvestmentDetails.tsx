import React from "react";
import DetailsTable from "../../components/common/DetailsTable";

const InvestmentDetails = ({ investment }) => {
    return (
        <>
            <section>
                <h2 className="text-3xl py-4 font-semibold capatalize">Investment Description</h2>
                <p>{investment.description}</p>
            </section>
            <div>
                <h2 className="text-3xl py-4 font-semibold capatalize">
                    {investment.type} Details
                </h2>
                <DetailsTable items={investment.features} />
            </div>
        </>
    );
};

export default InvestmentDetails;
