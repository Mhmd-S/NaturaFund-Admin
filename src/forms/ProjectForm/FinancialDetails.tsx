import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import TableForm from '@forms/FormComponents/TablesForm';

const FinancialDetails = ({ project, setProject }) => {
  const financialDetails = project?.financialDetails || {};

  return (
    <div className="divide-y-2 flex flex-col gap-12">
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="timeline"
        defaultValues={financialDetails.timeline}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="allocation"
        defaultValues={financialDetails.allocation}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="useOfProceeds"
        defaultValues={financialDetails.useOfProceeds}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="revenueForecast"
        defaultValues={financialDetails.revenueForecast}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="NPV"
        defaultValues={financialDetails.NPV}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="IRR"
        defaultValues={financialDetails.IRR}
      />
      <TableForm
        project={project}
        setProject={setProject}
        category="financialDetails"
        name="breakEven"
        defaultValues={financialDetails.breakEven}
      />
      <TableForm
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