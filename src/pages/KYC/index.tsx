import SearchBar from '@/components/common/SearchBar';
import ProjectsTable from '@/components/common/ProjectsTable';

const dummyData = [
  {
    id: 1,
    name: 'John Doe',
    date_submitted: '21/12/2001',
    status: 'Action Required',
    type: 'company',
  },
  {
    id: 2,
    name: 'Project 2',
    date_submitted: '21/12/2001',
    status: 'On Hold',
    type: 'company',
  },
  {
    id: 3,
    name: 'Project 3',
    date_submitted: '21/12/2001',
    status: 'On Hold',
    type: 'user',
  },
  {
    id: 4,
    name: 'Project 4',
    date_submitted: '21/12/2001',
    status: 'On Hold',
    type: 'company',
  },
];
const KYC = () => {
  return (
    <div className="w-full p-6 bg-gray-300/25 overflow-y-auto">
      <div className="h-screen flex flex-col gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
          <p className="text-lg font-bold text-brand-900">Applications</p>
          <div className="w-1/3">
            <SearchBar />
          </div>
        </div>
        <ProjectsTable data={dummyData} handleOnClick={() => console.log(1)} />
      </div>
    </div>
  );
};

export default KYC;
