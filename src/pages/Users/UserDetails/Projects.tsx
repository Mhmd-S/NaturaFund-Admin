import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectsTable from '@components/common/ProjectsTable';
import SearchBar from '@components/common/SearchBar';

import * as projectApi from '@api/project';
import { toast } from 'react-toastify';

const Projects = ({ userId }) => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjecstByCorporation(userId);
        setProjects(response.data);
      } catch (error) {
        toast.error("Couldn't fetch projects. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOnClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="h-screen flex flex-col gap-6">
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
        <p className="text-lg font-bold text-brand-900">Projects</p>
        <div className="w-1/3">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>
      <ProjectsTable
        data={projects}
        loading={loading}
        acceptData={['_id', 'name']}
        projectField="project"
        projectIdField="_id"
        searchText={searchText}
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default Projects;
