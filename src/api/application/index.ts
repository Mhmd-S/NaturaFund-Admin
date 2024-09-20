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
