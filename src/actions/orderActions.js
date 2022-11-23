import AxiosInstance from "../axiosinstance";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CURRENT_USER_ORDERS_REQUEST,
    CURRENT_USER_ORDERS_SUCCESS,
    CURRENT_USER_ORDERS_FAIL,
    GET_SINGLE_ORDER_REQUEST,
    GET_SINGLE_ORDER_SUCCESS,
    GET_SINGLE_ORDER_FAIL,
    UPI_ORDER_REQUEST,
    UPI_ORDER_SUCCESS,
    UPI_ORDER_FAIL,
} from "../types/orderTypes";

export const createOrder = (orderDetails) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/orders`, orderDetails);
        console.log("dataAction", data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error
        });
    }
}

export const currentUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: CURRENT_USER_ORDERS_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/orders/showAllMyOrders`);
        console.log("dataAction", data);
        dispatch({
            type: CURRENT_USER_ORDERS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CURRENT_USER_ORDERS_FAIL,
            payload: error
        });
    }
}

export const getSingleOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_ORDER_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/orders/${id}`);
        console.log("dataAction", data);
        dispatch({
            type: GET_SINGLE_ORDER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_SINGLE_ORDER_FAIL,
            payload: error
        });
    }
}

export const createUpiOrder = (productDetails) => async (dispatch) => {
    try {
        console.log("productDetails", productDetails);
        dispatch({ type: UPI_ORDER_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/orders/upi`, { productDetails });
        console.log("dataAction", data);
        dispatch({
            type: UPI_ORDER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPI_ORDER_FAIL,
            payload: error
        });
    }
}