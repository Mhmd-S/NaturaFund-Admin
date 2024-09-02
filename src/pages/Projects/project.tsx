import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Overview from '@/modules/ProjectModule/Overview';
import FinancialDetails from '@/modules/ProjectModule/FinancialDetails';
import TabbedWindow from '@/components/common/TabbedWindow';

const Project = () => {
  const { projectId } = useParams();

  const [currentTab, setCurrentTab] = useState('Overview');

  const renderTab = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview />;
      case 'Financial Details':
        return <FinancialDetails />;
      default:
        return <Overview />;
    }
  };

  return (
    <TabbedWindow
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={['Overview', 'Financial Details']}
    >
      {renderTab()}
    </TabbedWindow>
  );
};

export default Project;
