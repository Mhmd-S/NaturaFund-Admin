import * as actionTypes from "./types";
import * as authService from "@api/auth";

import { registerDataType, loginDataType, verifyDataType } from "@api/auth";

// actions.js

const contextActions = (dispatch) => {
    return {
        login: async (loginData: loginDataType) => {
            dispatch({ type: actionTypes.LOADING_REQUEST });
            const data = await authService.login(loginData);
            if (data.status == "success") {
                dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.data });
            } else {
                dispatch({ type: actionTypes.FAILED_REQUEST, payload: data.message });
            }
        },
        register: async (registerData: registerDataType) => {
            dispatch({ type: actionTypes.LOADING_REQUEST });
            const data = await authService.register(registerData);
            if (data.status == "success") {
                dispatch({ type: actionTypes.REGISTER_SUCCESS });
            } else {
                dispatch({ type: actionTypes.FAILED_REQUEST, payload: data.message });
            }
        },
        verify: async (verifyData: verifyDataType) => {
            dispatch({ type: actionTypes.LOADING_REQUEST });
            const data = await authService.verify(verifyData);
            if (data.status == "success") {
                dispatch({ type: actionTypes.VERIFY_SUCCESS });
            } else {
                dispatch({ type: actionTypes.FAILED_REQUEST, payload: data.message });
            }
        },
        // resetPassword: async ({ resetPasswordData }) => {
        //     dispatch({ type: actionTypes.LOADING_REQUEST });
        //     const data = await authService.resetPassword({ resetPasswordData });
        //     if (data.status == "success") {
        //         dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.data });
        //     } else {
        //         dispatch({ type: actionTypes.FAILED_REQUEST });
        //     }
        // },
        logout: async () => {
            const data = await authService.logout();
            if (data.status == "success") {
                dispatch({ type: actionTypes.LOGOUT_FAILED, payload: data.data });
            } else {
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
            }
        },
        getUser: async () => {
            dispatch({ type: actionTypes.LOADING_REQUEST });
            const data = await authService.getUser();
            if (data.status == "success") {
                dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.data });
            } else {
                dispatch({ type: actionTypes.FAILED_REQUEST, payload: data.message });
            }
        },
    };
};

export default contextActions;
