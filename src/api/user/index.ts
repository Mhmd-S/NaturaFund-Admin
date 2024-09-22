import { api } from '@config/axiosConfig';
import errorHandler from '@request/errorHandler';
import successHandler from '@request/successHandler';

export const getUser = async (id) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: `user/${id}`,
    });

    const { status, data } = response;
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateUser = async (updateData) => {
  try {
    const response = await api.request({
      method: 'PUT',
      url: `user/${updateData._id}`,
      data: updateData,
    });

    const { status, data } = response;
    console.log(response);
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.request({
      method: 'DELETE',
      url: `user/${id}`,
    });

    const { status, data } = response;
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.request({
      method: 'GET',
      url: 'user',
    });

    const { status, data } = response;
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
