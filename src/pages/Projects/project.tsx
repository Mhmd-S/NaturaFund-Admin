import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Overview from '@/modules/ProjectModule/Overview';
import FinancialDetails from '@/modules/ProjectModule/FinancialDetails';
import TabbedWindow from '@/components/common/TabbedWindow';

import InvestmentDetails from '@/modules/ProjectModule/InvestmentDetails';

const Project = () => {
  const { projectId } = useParams();

  const [currentTab, setCurrentTab] = useState('Overview');

  const renderTab = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview />;
      case 'Financial Details':
        return <FinancialDetails />;
      case 'Investment Details':
        return <InvestmentDetails />;
      default:
        return <Overview />;
    }
  };

  return (
    <TabbedWindow
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={['Overview', 'Investment Details', 'Financial Details']}
    >
      {renderTab()}
    </TabbedWindow>
  );
};

export default Project;
