import React, { Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import TabNav from '@components/common/TabNav';
import LoadingIcon from './LoadingIcon';

const TabbedWindow = ({
  loading,
  currentTab,
  setCurrentTab,
  tabs,
  showGoBack = true,
  children,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back one step in the history stack
  };

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="min-h-screen flex flex-col bg-white p-6 rounded-3xl">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <>
            <div className="w-full grid grid-rows-1 grid-flow-col">
              <button
                onClick={handleGoBack}
                className={`${!showGoBack && 'sr-only'} mb-4 justify-self-start place-self-start text-gray-600 hover:text-gray-800`}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </button>
              <TabNav tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </div>
            <div className="min-h-[26rem] p-4 grid grid-cols-1 gap-16 bg-white rounded-3xl">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabbedWindow;
