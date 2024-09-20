import React, { useState, useEffect } from 'react';

import ProjectsTable from '@components/common/ProjectsTable';
import SearchBar from '@components/common/SearchBar';
import LoadingIcon from '@components/common/LoadingIcon';
import EmptyState from '@components/common/EmptyState';

import { useAuthContext } from '@context/AuthContext';

import * as projectApi from '@api/project';

import { faMeh } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
  const { state } = useAuthContext();

  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjects(1);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">Projects</p>
          <div className="w-1/3">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>
        {error && (
          <div className="bg-red-200 border-red-400 border-l-4 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {loading ? (
          <LoadingIcon />
        ) : projects.length > 0 ? (
          <ProjectsTable
            data={projects}
            acceptData={['_id', 'name', '', 'projectStatus', 'type']}
            projectIdField="_id"
            searchText={searchText}
          />
        ) : (
          <EmptyState title="Nothing to display" icon={faMeh} />
        )}
      </div>
    </div>
  );
};

export default Projects;
