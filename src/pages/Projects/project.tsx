import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import TabbedWindow from '@components/common/TabbedWindow';

import Overview from '@forms/ProjectForm/Overview';
import FinancialDetails from '@forms/ProjectForm/FinancialDetails';
import InvestmentDetails from '@forms/ProjectForm/InvestmentDetails';
import Status from '@forms/ProjectForm/Status';
import Documents from '@forms/ProjectForm/Documents';

import * as projectApi from '@api/project';

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState('Overview');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProject(id);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  const renderTab = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview project={project} setProject={setProject} />;
      case 'Financial Details':
        return <FinancialDetails project={project} />;
      case 'Investment Details':
        return <InvestmentDetails project={project} />;
      case 'Status':
        return <Status project={project} />;
      case 'Documents':
        return <Documents project={project} setProject={setProject} />;
      default:
        return <Overview project={project} setProject={setProject} />;
    }
  };

  return (
    <TabbedWindow
      loading={loading}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      tabs={['Overview', 'Investment Details', 'Financial Details', 'Status', 'Documents']}
    >
      {renderTab()}
    </TabbedWindow>
  );
};

export default Project;
