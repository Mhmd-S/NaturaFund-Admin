import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import TableForm from '@/forms/FormComponents/TablesForm';

let finance = {
  Timeline: {
    'Construction Start': '2024-01-01',
    COD: '2024-12-31',
    'Payout Start': '2025-01-01',
  },
  useOfProceeds: {
    Construction: '80%',
    'Working Capital': '20%',
  },
  projections: {
    revenueForecast: {
      'Year 1': 'RM 10,000',
      'Year 2': 'RM 20,000',
      'Year 3': 'RM 30,000',
      'Year 4': 'RM 40,000',
      'Year 5': 'RM 50,000',
    },
    profitabilityMetrics: {
      NPV: {
        'Base Case': 'RM 100,000',
        Downside: 'RM 50,000',
        Upside: 'RM 150,000',
      },
      IRR: {
        'Base Case': '5%',
        Downside: '3%',
        Upside: '7%',
      },
    },
    breakEven: {
      Year: '3',
      IRR: '5%',
    },
  },
  Allocation: {
    'Construction Cost': 'RM 100,000',
    'Working Capital': 'RM 20,000',
  },
  'Risk Analysis': {
    'Market Risk': 'Low',
    'Technology Risk': 'Medium',
    'Regulatory Risk': 'High',
  },
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
