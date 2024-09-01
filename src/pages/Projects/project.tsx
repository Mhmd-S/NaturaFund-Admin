import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Overview from '@/modules/ProjectModule/Overview';
import TabbedWindow from '@/components/common/TabbedWindow';

const Project = () => {
  const { projectId } = useParams();

  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <TabbedWindow currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={["Overview"]} >
      <Overview />
    </TabbedWindow>
  );
};

export default Project;
