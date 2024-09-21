import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import TableForm from '@forms/FormComponents/TablesForm';

const FinancialDetails = ({ project }) => {
  return (
    <div className="divide-y-2 flex flex-col gap-12">
      <TableForm project={project} category='financialDetails' name="timeline" defaultValues={project.financialDetails.timeline} />
      <TableForm project={project} category='financialDetails' name="allocation" defaultValues={project.financialDetails.allocation} />
      <TableForm project={project} category='financialDetails' name="useOfProceeds" defaultValues={project.financialDetails.useOfProceeds} />
      <TableForm project={project} category='financialDetails' name="revenueForecast" defaultValues={project.financialDetails.revenueForecast} />
      <TableForm project={project} category='financialDetails' name="NPV" defaultValues={project.financialDetails.NPV} /> 
      <TableForm project={project} category='financialDetails' name="IRR" defaultValues={project.financialDetails.IRR} />
      <TableForm project={project} category='financialDetails' name="breakEven" defaultValues={project.financialDetails.breakEven} />
      <TableForm project={project} category='financialDetails' name="riskAnalysis" defaultValues={project.financialDetails.riskAnalysis} />
    </div>
  );
};

export default FinancialDetails;
