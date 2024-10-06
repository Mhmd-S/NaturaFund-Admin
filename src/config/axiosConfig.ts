import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3003/api/v1/",
    withCredentials: true,
});

// // defining a custom error handler for all APIs
// const errorHandler = (error) => {
//     const statusCode = error.response?.status;

//     if (error.code === "ERR_BAD_REQUEST") {
//         if (error.response && error.response.data) {
//             // If the server returned an error response, return it
//             return error.response;
//         } else {
//             // If there was no response or the error was not from the server, return a generic error message
//             return {
//                 data: {
//                     status: "fail",
//                     message: "An error occurred while sending the verification code.",
//                 },
//             };
//         }
//     }

//     if (error.code === "ERR_BAD_REQUEST") {
//         if (error.response && error.response.data) {
//             // If the server returned an error response, return it
//             return error.response;
//         } else {
//             // If there was no response or the error was not from the server, return a generic error message
//             return {
//                 data: { status: "fail", message: "An error occurred while verifying the code." },
//             };
//         }
//     }

//     if (error.code == "ERR_NETWORK_ERROR") {
//         return Promise.resolve();
//     }

//     // logging only errors that are not 401
//     if (statusCode && statusCode !== 401) {
//         console.error(error);
//     }

//     return Promise.reject(error);
// };

// // registering the custom error handler to the
// // "api" axios instance
// api.interceptors.response.use(undefined, (error) => {
//     return errorHandler(error);
// });
