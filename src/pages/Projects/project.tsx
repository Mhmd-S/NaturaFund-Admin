import { useState } from 'react';

import { useParams } from 'react-router-dom';

import TabbedWindow from '@/components/common/TabbedWindow';

import Overview from '@/forms/ProjectForm/Overview';
import FinancialDetails from '@/forms/ProjectForm/FinancialDetails';
import InvestmentDetails from '@/forms/ProjectForm/InvestmentDetails';
import Status from '@/forms/ProjectForm/Status';
import Documents from '@/forms/ProjectForm/Documents';

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
      case 'Status':
        return <Status />;
      case 'Documents':
        return <Documents />;
      default:
        return <Overview />;
    }
  };

  return (
    <TabbedWindow
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={['Overview', 'Investment Details', 'Financial Details', 'Status', 'Documents']}
    >
      {renderTab()}
    </TabbedWindow>
  );
};

export default Project;
