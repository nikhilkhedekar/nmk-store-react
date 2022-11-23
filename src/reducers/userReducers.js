import { updateUserState, updatePasswordState } from "../initStates/userState"
import { 
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL
 } from "../types/userTypes"

export const updateUserReducer = (state = updateUserState, action) => {
    switch (action.type){
        case UPDATE_USER_REQUEST:
            return { loading: true, user: null };
        case UPDATE_USER_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, user: action.payload };
        case UPDATE_USER_FAIL:
            return { loading: false, user: null, error: action.payload };
    }
    return state;
}

export const updatePasswordReducer = (state = updatePasswordState, action) => {
    switch (action.type){
        case UPDATE_PASSWORD_REQUEST:
            return { loading: true, user: null };
        case UPDATE_PASSWORD_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, user: action.payload };
        case UPDATE_PASSWORD_FAIL:
            return { loading: false, user: null, error: action.payload };
    }
    return state;
}