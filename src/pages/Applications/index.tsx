import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectsTable from '@components/common/ProjectsTable';
import SearchBar from '@components/common/SearchBar';
import LoadingIcon from '@components/common/LoadingIcon';
import EmptyState from '@components/common/EmptyState';

import * as applicationsApi from '@api/application';

import { faMeh } from '@fortawesome/free-solid-svg-icons';

const Applications = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await applicationsApi.getApplications();
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOnClick = (projectId: string) => {
    navigate(`/applications/${projectId}`);
  };

  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">Project Applications</p>
          <div className="w-1/3">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {error && (
          <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <ProjectsTable
          loading={loading}
          handleOnClick={handleOnClick}
          data={applications}
          acceptData={['_id', 'name', 'applicant.registeredName']}
          projectIdField="_id"
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default Applications;
