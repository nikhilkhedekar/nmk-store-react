import AxiosInstance from "../axiosinstance";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL
} from "../types/productTypes"

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/products/`)
        console.log("dataAction", data);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error
        });
    }
}

export const getSingleProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/products/${id}`);
        console.log("dataAction", data);
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data.product
        });
    }catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error
        });
    }
}