import { api } from '@config/axiosConfig';
import errorHandler from '@request/errorHandler';
import successHandler from '@request/successHandler';

export const getKycDetails = async (userId: string) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: `kyc/${userId}`,
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

export const updateKyc = async (kycData: any) => {
  try {
    const response = await api.request({
      method: 'PUT',
      url: `kyc/${kycData._id}`,
      data: { status: kycData.status, reason: kycData.reason },
    });

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
