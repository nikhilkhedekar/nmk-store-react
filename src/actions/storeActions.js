import AxiosInstance from "../axiosinstance";
import { GET_ALL_STORES_FAIL, GET_ALL_STORES_REQUEST, GET_ALL_STORES_SUCCESS } from "../types/storeTypes";

export const getAllStoreActions = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_STORES_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/stores`);
        console.log("dataAction", data);
        dispatch({
            type: GET_ALL_STORES_SUCCESS,
            payload: data.stores
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_STORES_FAIL,
            payload: error
        });
    }
}