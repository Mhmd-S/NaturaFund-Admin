import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import TableForm from '@/forms/FormComponents/TablesForm';

let finance = {
  Timeline: [
    { label: 'Construction Start', value: '80%' },
    { label: 'COD', value: '20%' },
    { label: 'Payout Start', value: '20%' },
  ],
  useOfProceeds: [
    { label: 'Construction', value: '80%' },
    { label: 'Working Capital', value: '20%' },
  ],
  projections: {
    revenueForecast: [
      { label: 'Base Case', value: '80%' },
      { label: 'DownSide', value: '20%' },
      { label: 'Upside', value: '20%' },
    ],
    profitabilityMetrics: {
      NPV: [
        { label: 'Base Case', value: '80%' },
        { label: 'DownSide', value: '20%' },
        { label: 'Upside', value: '20%' },
      ],
      IRR: [
        { label: 'Base Case', value: '80%' },
        { label: 'DownSide', value: '20%' },
        { label: 'Upside', value: '20%' },
      ],
    },
    breakEven: [
      { label: 'Year', value: '80%' },
      { label: 'IRR', value: '20%' },
    ],
  },
  Allocation: [
    { label: 'Construction', value: '80%' },
    { label: 'Working Capital', value: '20%' },
  ],
  'Risk Analysis': [
    { label: 'Market Risk', value: 'Low' },
    { label: 'Technology Risk', value: 'Medium' },
    { label: 'Regulatory Risk', value: 'Hight' },
  ],
};

const FinancialDetails = () => {
  return (
    <div className="divide-y-2 flex flex-col gap-12">
      <TableForm name="Timeline" defaultValues={finance['Timeline']} />
      <TableForm name="Allocation" defaultValues={finance['Allocation']} />
      <TableForm name="Risk Analysis" defaultValues={finance['Risk Analysis']} />
    </div>
  );
};

export default FinancialDetails;
