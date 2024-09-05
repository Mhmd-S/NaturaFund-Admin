import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import DetailsTable from '@/components/common/DetailsTable';

const DUMMYUSER = {
  id: 1,
  name: 'John Doe',
  email: 'msuliman963@gmail.com',
  type: 'Corporate',
  phone: '1234567890',
};

const UserDetails = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className=" p-4 grid grid-cols-2 gap-3 bg-white rounded-3xl">
        <h2 className="col-span-2 text-3xl py-4 font-bold sm:text-4xl flex flex-col space-y-1">
          <span className="flex items-center gap-4">
            {' '}
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="size-5 cursor-pointer"
              onClick={handleGoBack}
            />
            {DUMMYUSER.name}
          </span>
        </h2>

        <DetailsTable items={DUMMYUSER} />

      </div>
    </div>
  );
};

export default UserDetails;
