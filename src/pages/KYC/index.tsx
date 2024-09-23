import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@components/common/SearchBar';
import ProjectsTable from '@components/common/ProjectsTable';
import * as userApi from '@api/user';

const KYC = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userApi.getUsers();
        const unverifiedUsers = response.data.filter(
          (user) => user.verified === 'pending' || user.verified === 'not verified'
        );
        setUsers(unverifiedUsers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const handleOnClick = (userId: string) => {
    navigate(`/kyc/${userId}`);
  };

  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">KYC Users</p>
          <div className="w-1/3">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        <ProjectsTable
          data={filteredUsers}
          handleOnClick={handleOnClick}
          acceptData={['_id', 'email', 'verification']}
          projectIdField="_id"
          searchText={searchText}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default KYC;
