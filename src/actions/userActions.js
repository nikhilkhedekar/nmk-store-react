import AxiosInstance from "../axiosinstance";
import { 
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL
 } from "../types/userTypes"

export const updateUser = (userData) => async (dispatch) => {
    try {
        console.log("userData", userData);
        dispatch({ type: UPDATE_USER_REQUEST });
        const { data } = await AxiosInstance.patch(`/api/v1/users/updateUser`, userData);
        console.log("dataAction", data);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error
        });
    }
}

export const upatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        console.log("passwords", passwords);
        const { data } = await AxiosInstance.patch(`/api/v1/users/updateUserPassword`, passwords);
        console.log("dataAction", data);
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error
        });
    }
}