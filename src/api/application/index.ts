import { api } from "@config/axiosConfig";
import errorHandler from "@request/errorHandler";
import successHandler from "@request/successHandler";

type ApplicationData = {
    projectName: string;
    country: string;
    location: string;
    description: string;
    documents: FileList;
};

export const createApplication = async (applicationData: ApplicationData) => {
    try {
        const response = await api.request({
            method: "POST",
            url: `application`,
            data: applicationData,
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

export const getApplications = async () => {
    try {
        const response = await api.request({
            method: "GET",
            url: `application`,
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

export const getApplication = async (id: string) => {
    try {
        const response = await api.request({
            method: "GET",
            url: `application/${id}`,
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
}

export const acceptApplication = async (id: string) => {
    try {
        const response = await api.request({
            method: "POST",
            url: `application/${id}/accept`,
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

export const updateApplication = async (id: string, applicationData: ApplicationData) => {
    try {
        const response = await api.request({
            method: "PUT",
            url: `application/${id}`,
            data: applicationData,
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
