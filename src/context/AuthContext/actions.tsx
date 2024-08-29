import * as actionTypes from "./types";
import * as authService from "@/auth";
import request from "@/request";

// actions.js

const contextActions = (dispatch) => {
    return {
        login: async ({ loginData }) => {
            dispatch({ type: actionTypes.REQUEST_LOADING });
            const data = await authService.login({ loginData });
            if (data.success) {
                dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.result });
            } else {
                dispatch({ type: actionTypes.REQUEST_FAILED });
            }
        },
        register: async ({ registerData }) => {
            dispatch({ type: actionTypes.REQUEST_LOADING });
            const data = await authService.register({ registerData });
            if (data.success) {
                dispatch({ type: actionTypes.REGISTER_SUCCESS });
            } else {
                dispatch({ type: actionTypes.REQUEST_FAILED });
            }
        },
        verify: async ({ email, emailToken }) => {
            dispatch({ type: actionTypes.REQUEST_LOADING });
            const data = await authService.verify({ email, emailToken });
            if (data.success) {
                dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.result });
            } else {
                dispatch({ type: actionTypes.REQUEST_FAILED });
            }
        },
        resetPassword: async ({ resetPasswordData }) => {
            dispatch({ type: actionTypes.REQUEST_LOADING });
            const data = await authService.resetPassword({ resetPasswordData });
            if (data.success) {
                dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.result });
            } else {
                dispatch({ type: actionTypes.REQUEST_FAILED });
            }
        },
        logout: async () => {
            const data = await authService.logout();
            if (!data.success) {
                dispatch({ type: actionTypes.LOGOUT_FAILED, payload: data.result });
            } else {
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
            }
        },
        updateProfile: async ({ entity, jsonData }) => {
            const data = await request.updateAndUpload({ entity, id: "", jsonData });
            if (data.success) {
                dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.result });
            }
        },
    };
};

export default contextActions;
