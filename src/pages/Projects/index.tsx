import React from 'react';

import SearchBar from '@/components/common/SearchBar';
import ProjectsTable from '@/components/common/ProjectsTable';

const dummyData = [
  {
    id: 1,
    name: 'Project 1',
    total_recieved: 100000,
    type: 'Equity',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Project 2',
    total_recieved: 100000,
    type: 'Equity',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Project 3',
    total_recieved: 100000,
    type: 'Equity',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Project 4',
    total_recieved: 100000,
    type: 'Equity',
    status: 'Approved',
  },
];

const Projects = () => {
  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">Projects</p>
          <div className="w-1/3">
            <SearchBar />
          </div>
        </div>
        <ProjectsTable data={dummyData} handleOnClick={() => console.log(1)} />
      </div>
    </div>
  );
};

export default Projects;
