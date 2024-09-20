import { api } from '@config/axiosConfig';
import errorHandler from '@request/errorHandler';
import successHandler from '@request/successHandler';

export const getProjects = async (page: number) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: `project`,
      params: { page },
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

export const getProject = async (id: string) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: `project/${id}`,
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

export const getProjecstByCorporation = async (corporationId) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: `project/corporation/${corporationId}`,
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

export const updateProject = async (id: string, data: any) => {
  try {
    const response = await api.request({
      method: 'PUT',
      url: `project/${id}`,
      data,
    });

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await api.request({
      method: 'DELETE',
      url: `project/${id}`,
    });

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
