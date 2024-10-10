import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '@components/common/SearchBar';
import ProjectsTable from '@components/common/ProjectsTable';

import { getInvestmentsByInvestor } from '@api/investment';

const Investments = ({ userId }) => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await getInvestmentsByInvestor(userId);

        const reducedResponse = response.data.reduce((acc, investment) => {
          const project = investment.project;

          const itemFound = acc.find((accItem) => accItem._id === project._id);

          if (itemFound) {
            return acc;
          }

          const formatedInvestment = {
            name: investment.project.name,
            ...investment,
            ...investment.project,
            status: investment.project.status.current,
            project: investment.project._id,
          };

          acc.push(formatedInvestment);
          return acc;
        }, []);

        setProjects(reducedResponse);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOnClick = (project: string) => {
    navigate(`/project/${project}`);
  };

  return (
    <div className="h-screen flex flex-col gap-6">
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
        <p className="text-lg font-bold text-brand-900">Investments</p>
        <div className="w-1/3">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>

      <ProjectsTable
        data={projects}
        loading={loading}
        error={error}
        acceptData={["name", "amount"]}
        projectField="project"
        projectIdField="_id"
        searchText={searchText}
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default Investments;
