import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '@components/common/SearchBar';
import ProjectsTable from '@components/common/ProjectsTable';

import * as userApi from '@api/user';

const Users = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await userApi.getUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOnClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">Projects</p>
          <div className="w-1/3">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>
        <ProjectsTable
          data={users}
          projectIdField="_id"
          acceptData={['_id', 'email', 'userType']}
          handleOnClick={handleOnClick}
          searchText={searchText}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Users;
