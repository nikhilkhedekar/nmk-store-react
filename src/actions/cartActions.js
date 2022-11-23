import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    CART_CHECKOUT_FAIL,
    CART_CHECKOUT_REQUEST,
    CART_CHECKOUT_SUCCESS,
    CART_ITEM_DETAILS_FAIL,
    CART_ITEM_DETAILS_REQUEST,
    CART_ITEM_DETAILS_SUCCESS,
    CHECKOUT_UPI_FAIL,
    CHECKOUT_UPI_REQUEST,
    CHECKOUT_UPI_SUCCESS,
    CURRENT_USER_CART_FAIL,
    CURRENT_USER_CART_REQUEST,
    CURRENT_USER_CART_SUCCESS,
    UPDATE_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS
} from "../types/cartTypes"
import AxiosInstance from "../axiosinstance";

export const addToCart = (cartItem) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/cart`, cartItem);
        console.log("dataAction", data);
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error
        });
    }
}

export const currentUserCart = () => async (dispatch) => {
    try {
        dispatch({ type: CURRENT_USER_CART_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/cart/user`);
        console.log("dataActions", data);
        dispatch({
            type: CURRENT_USER_CART_SUCCESS,
            payload: data.cart
        });
    } catch (error) {
        dispatch({
            type: CURRENT_USER_CART_FAIL,
            payload: error
        })
    }
}

export const cartItemDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: CART_ITEM_DETAILS_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/cart/${productId}`);
        console.log("dataAction", data);
        dispatch({
            type: CART_ITEM_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_ITEM_DETAILS_FAIL,
            payload: error
        })
    }
}

export const cartCheckout = () => async (dispatch) => {
    try {
        dispatch({ type: CART_CHECKOUT_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/cart/user`);
        console.log("dataAction", data);
        dispatch({
            type: CART_CHECKOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_CHECKOUT_FAIL,
            payload: error
        })
    }
}

export const updateCart = (cartItem) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_REQUEST });
        const { data } = await AxiosInstance.patch(`/api/v1/cart`, cartItem);
        console.log("dataAction", data);
        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CART_FAIL,
            payload: error
        });
    }
}

export const checkoutCartUpi = (tokenizationData) => async (dispatch) => {
    try {
        dispatch({ type: CHECKOUT_UPI_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/cart/checkoutByUpi`, tokenizationData);
        console.log("dataAction", data);
        dispatch({
            type: CHECKOUT_UPI_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CHECKOUT_UPI_FAIL,
            payload: error
        })
    }
}