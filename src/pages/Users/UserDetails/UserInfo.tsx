import React, { useState, useEffect } from 'react';

import DetailsTable from '@components/common/DetailsTable';

import { getUser } from '@api/user';
import LoadingIcon from '@components/common/LoadingIcon';

const UserInfo = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.log("Couldn't fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
      ...rest
    } = user;
    return rest;
  };

  return (
    <div>
      {loading ? (
        <div>
          <LoadingIcon />
        </div>
      ) : (
        <>
          <DetailsTable title="User Details" items={userItems()} />

          {user.userType == 'Corporation' && (
            <div className="col-span-2">
              <DetailsTable title="Representative Details" items={JSON.parse(user.representative)} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserInfo;
