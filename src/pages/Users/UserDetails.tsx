import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import DetailsTable from '@components/common/DetailsTable';
import * as userApi from '@api/user';
import * as investmentApi from '@api/investment';
import * as projectApi from '@api/project';
import LoadingIcon from '@components/common/LoadingIcon';

const UserDetails = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [investments, setInvestments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [suspending, setSuspending] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await userApi.getUser(id);
        setUser(userResponse.data);

        const investmentsResponse = await investmentApi.getInvestmentsByInvestor(id);
        setInvestments(investmentsResponse.data);

        if (userResponse.data.userType === 'corporation') {
          const projectsResponse = await projectApi.getProjecstByCorporation(id);
          setProjects(projectsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSuspendUser = async () => {
    setSuspending(true);
    try {
      await userApi.updateUser({ ...user, suspended: true });
      setUser((prevUser) => ({ ...prevUser, suspended: true }));
    } catch (error) {
      setError(error);
    } finally {
      setSuspending(false);
    }
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <h2 className="col-span-2 text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
              <span className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="size-5 cursor-pointer"
                  onClick={handleGoBack}
                />
                {user.email}
              </span>
            </h2>

            <DetailsTable title="User Details" items={user} />
            <DetailsTable title="Investments" items={investments} />

            {user.userType === 'corporation' && (
              <div className="col-span-2">
                <DetailsTable title="Projects" items={projects} />
                <div className="flex flex-col gap-2">
                  {projects.map((project) => (
                    <button
                      key={project._id}
                      onClick={() => handleViewProject(project._id)}
                      className="px-4 py-2 border-[1px] border-brand-900 rounded-lg text-white bg-brand-900 transition-all hover:bg-white hover:text-brand-900"
                    >
                      View Project: {project.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="col-span-2 flex justify-end">
              <button
                onClick={handleSuspendUser}
                disabled={suspending || user.suspended}
                className={`px-4 py-2 border-[1px] border-red-600 rounded-lg text-white bg-red-600 transition-all hover:bg-white hover:text-red-600 ${
                  suspending || user.suspended ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {suspending ? 'Suspending...' : user.suspended ? 'User Suspended' : 'Suspend User'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;