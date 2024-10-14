import React, { useState, useEffect } from 'react';

import DetailsTable from '@components/common/DetailsTable';

import { getUser, suspendUser } from '@api/user';
import LoadingIcon from '@components/common/LoadingIcon';


const UserInfo = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.log("Couldn't fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [loading]);

  const userItems = () => {
    const {
      password,
      selfieId,
      frontId,
      backId,
      createdAt,
      updatedAt,
      addressProof,
      representative,
      __v,
      verified,
      bankAccount,
      suspended,
      ...rest
    } = user;
    return rest;
  };

  const handleSuspendUser = () => {
    setLoading(true);
    suspendUser(userId).finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <DetailsTable title="User Details" items={userItems()} />

          {user.userType == 'Corporation' && (
            <DetailsTable title="Representative Details" items={JSON.parse(user.representative)} />
          )}
          <button
            className="align-self-center justify-self-center my-2 border-2 border-red-600 bg-red-600 p-4 rounded-xl text-white hover:bg-white hover:text-red-600"
            onClick={handleSuspendUser}
            type='button'
          >
            {user.suspended ? 'Unsuspend User' : 'Suspend User'}
          </button>
        </>
      )}
    </>
  );
};

export default UserInfo;
