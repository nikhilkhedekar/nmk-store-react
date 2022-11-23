import AxiosInstance from "../axiosinstance";
import {
    POST_REVIEW_REQUEST,
    POST_REVIEW_SUCCESS,
    POST_REVIEW_FAIL,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    GET_SINGLE_REVIEW_REQUEST,
    GET_SINGLE_REVIEW_SUCCESS,
    GET_SINGLE_REVIEW_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL
} from "../types/reviewTypes"

export const postReview = (review) => async (dispatch) => {
    try {
        dispatch({ type: POST_REVIEW_REQUEST });
        const { data } = await AxiosInstance.post(`/api/v1/reviews`, review);
        console.log("dataAction", data);
        dispatch({
            type: POST_REVIEW_SUCCESS,
            payload: data.review
        });
    } catch (error) {
        dispatch({
            type: POST_REVIEW_FAIL,
            payload: error
        });
    }
}

export const getAllReviews = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/reviews`);
        console.log("dataAction", data);
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error
        });
    }
}

export const getSingleReview = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_REVIEW_REQUEST });
        const { data } = await AxiosInstance.get(`/api/v1/reviews/${id}`);
        console.log("dataAction", data);
        dispatch({
            type: GET_SINGLE_REVIEW_SUCCESS,
            payload: data.review
        });
    } catch (error) {
        dispatch({
            type: GET_SINGLE_REVIEW_FAIL,
            payload: error
        });
    }
}

export const updateReview = (id, review) => async (dispatch) => {
    try {        
        dispatch({ type: UPDATE_REVIEW_REQUEST });        
        const { data } = await AxiosInstance.patch(`/api/v1/reviews/${id}`, review);
        console.log("dataAction", data);
        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: data.review
        });
    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error
        });
    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {        
        dispatch({ type: DELETE_REVIEW_REQUEST });        
        const { data } = await AxiosInstance.delete(`/api/v1/reviews/${id}`);
        console.log("dataAction", data);
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error
        });
    }
}