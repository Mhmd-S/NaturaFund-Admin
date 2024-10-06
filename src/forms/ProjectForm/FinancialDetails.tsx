import TableForm from '@forms/FormComponents/TablesForm';

const FinancialDetails = ({ project, setProject }) => {
  const financialDetails = project?.financialDetails || {};

  return (
    <div className="divide-y-2 flex flex-col gap-12">
      <TableForm
        tip="Please provide a detailed timeline of the project. This should include the start date, end date, and key milestones. Use MM-YYYY format."
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="timeline"
        defaultValues={financialDetails.timeline}
      />
      <TableForm
        tip="Percentage of the total project cost that will be allocated to each category. The total should add up to 100%."
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="allocation"
        defaultValues={financialDetails.allocation}
      />
      <TableForm
        tip="Please provide a detailed breakdown of the project costs. This should include the cost of materials, labor, and any other expenses. Should be proportional to the allocation."
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="useOfProceeds"
        defaultValues={financialDetails.useOfProceeds}
      />
      <TableForm
        tip="The forecasted revenue for the project. Format: Field Name: 2020 | Field Value: 300,000,000 RM"
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="revenueForecast"
        defaultValues={financialDetails.revenueForecast}
      />
      <TableForm
        tip="Should have best, worst, and base case scenarios. Format: Field Name: Best Case | Field Value: 300,000,000 RM"
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="NPV"
        defaultValues={financialDetails.NPV}
      />
      <TableForm
        tip="Should have best, worst, and base case scenarios. Format: Field Name: Best Case | Field Value: 13%"
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="IRR"
        defaultValues={financialDetails.IRR}
      />
      <TableForm
        tip="Should have best, worst, and base case scenarios. Format: Field Name: Best Case | Field Value: 13%"
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="breakEven"
        defaultValues={financialDetails.breakEven}
      />
      <TableForm
        tip="Should cover a variety of risks including market, financial, operational, and regulatory risks. The value should be a severity ( Insignificant, Minor, Moderate, Major ) and likelihood ( Rare, Unlikely, Possible, Likely ). For Example: Market Risk: Rare - Major."
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="riskAnalysis"
        defaultValues={financialDetails.riskAnalysis}
      />
    </div>
  );
};

export default FinancialDetails;
