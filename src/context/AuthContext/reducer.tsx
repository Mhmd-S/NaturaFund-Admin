import * as actionTypes from "./types";

export const initialState = {
    current: null,
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const contextReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.LOADING_REQUEST:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true,
                isSuccess: false,
                error: null,
            };

        case actionTypes.FAILED_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case actionTypes.LOGIN_SUCCESS:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };

        case actionTypes.VERIFY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };

        case actionTypes.REGISTER_SUCCESS:
            return {
                current: null,
                isLoggedIn: false,
                isLoading: false,
                isSuccess: true,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return initialState;

        case actionTypes.LOGOUT_FAILED:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };

        case actionTypes.GET_USER:
            return {
                current: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };

        default:
            return state;
    }
};

export default contextReducer;
