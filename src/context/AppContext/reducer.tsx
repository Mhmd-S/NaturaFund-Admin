import * as actionTypes from "./types";

export const initialState = {
    duration: null,
    maxCount: null,
    message: null,
    description: null,
};

export const contextReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CONFIG: {
            return { 
                ...state,
                duration: action.payload.duration,
                maxCount: action.payload.maxCount,
            };
        }
        case actionTypes.SUCCESS: {
            return {
                ...state,
                message: action.payload.description,
                description: action.payload.description,
            };
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                message: action.payload.message,
                description: action.payload.description,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};
