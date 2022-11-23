import { postReviewState, reviewsState, getSingleReviewState, updateReviewState, deleteReviewState } from "../initStates/reviewState"
import { 
    POST_REVIEW_REQUEST,
    POST_REVIEW_SUCCESS,
    POST_REVIEW_FAIL,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
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

export const postReviewReducer = (state = postReviewState, action) => {
    switch (action.type){
        case POST_REVIEW_REQUEST:
            return { loading: true, review: null };
        case POST_REVIEW_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, review: action.payload };
        case POST_REVIEW_FAIL:
            return { loading: false, review: null, error: action.payload };
    }
    return state;
}

export const reviewsReducer = (state = reviewsState, action) => {
    switch (action.type){
        case ALL_REVIEW_REQUEST:
            return { loading: true, reviews: null };
        case ALL_REVIEW_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, reviews: action.payload };
        case ALL_REVIEW_FAIL:
            return { loading: false, reviews: null, error: action.payload };
    }
    return state;
}

export const reviewReducer = (state = getSingleReviewState, action) => {
    switch (action.type){
        case GET_SINGLE_REVIEW_REQUEST:
            return { loading: true, review: null };
        case GET_SINGLE_REVIEW_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, review: action.payload };
        case GET_SINGLE_REVIEW_FAIL:
            return { loading: false, review: null, error: action.payload };
    }
    return state;
}

export const updateReviewReducer = (state = updateReviewState, action) => {
    switch (action.type){
        case UPDATE_REVIEW_REQUEST:
            return { loading: true, review: null };
        case UPDATE_REVIEW_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, review: action.payload };
        case UPDATE_REVIEW_FAIL:
            return { loading: false, review: null, error: action.payload };
    }
    return state;
}

export const deleteReviewReducer = (state = deleteReviewState, action) => {
    switch (action.type){
        case DELETE_REVIEW_REQUEST:
            return { loading: true, review: null };
        case DELETE_REVIEW_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, review: action.payload };
        case DELETE_REVIEW_FAIL:
            return { loading: false, review: null, error: action.payload };
    }
    return state;
}