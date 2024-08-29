import codeMessage from "./codeMessage";
import { toast } from "react-toastify";

const errorHandler = (error) => {
    // For internet connection - Check if the user is online
    // if (!navigator.onLine) {
    //   toast.config({
    //     duration: 15,
    //     maxCount: 1,
    //   });
    //   // Code to execute when there is internet connection
    //   toast.error({
    //     message: 'No internet connection',
    //     description: 'Cannot connect to the Internet, Check your internet network',
    //   });
    //   return {
    //     success: false,
    //     result: null,
    //     message: 'Cannot connect to the server, Check your internet network',
    //   };
    // }

    const { response } = error;

    if (!response) {
        // Code to execute when there is no internet connection
        toast.error({
            message: "Problem connecting to server",
            description: "Cannot connect to the server, Try again later",
        });
        return {
            success: false,
            result: null,
            message: "Cannot connect to the server, Contact your Account administrator",
        };
    }

    if (response && response.data && response.data.jwtExpired) {
        const result = window.localStorage.getItem("auth");
        const jsonFile = window.localStorage.getItem("isLogout");
        const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("isLogout");
        if (result || isLogout) {
            window.location.href = "/logout";
        }
    }

    if (response && response.status) {
        const message = response.data && response.data.message;

        const errorText = message || codeMessage[response.status];
        const { status } = response;
        toast.error({
            message: `Request error ${status}`,
            description: errorText,
        });
        return response.data;
    } else {
        if (navigator.onLine) {
            // Code to execute when there is internet connection
            toast.error({
                message: "Problem connecting to server",
                description: "Cannot connect to the server, Try again later",
            });
            return {
                success: false,
                result: null,
                message: "Cannot connect to the server, Contact your Account administrator",
            };
        } else {
            // Code to execute when there is no internet connection
            toast.error({
                message: "No internet connection",
                description: "Cannot connect to the Internet, Check your internet network",
            });
            return {
                success: false,
                result: null,
                message: "Cannot connect to the server, Check your internet network",
            };
        }
    }
};

export default errorHandler;
