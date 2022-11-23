import { createOrderState, createUpiOrderState, currentUserOrdersState, getSingleOrderState, updateOrderState } from "../initStates/orderState"; 
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
 } from "../types/orderTypes"

export const orderReducer = (state = createOrderState, action) => {
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return { loading: true, order: null };
        case CREATE_ORDER_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, order: action.payload };
        case CREATE_ORDER_FAIL:
            return { loading: false, order: null, error: action.payload };
    }
    return state;
}

export const currentUserOrderReducer = (state = currentUserOrdersState, action) => {
    switch (action.type){
        case CURRENT_USER_ORDERS_REQUEST:
            return { loading: true, orders: null };
        case CURRENT_USER_ORDERS_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, orders: action.payload };
        case CURRENT_USER_ORDERS_FAIL:
            return { loading: false, orders: null, error: action.payload };
    }
    return state;
}

export const singleOrderReducer = (state = getSingleOrderState, action) => {
    switch (action.type){
        case GET_SINGLE_ORDER_REQUEST:
            return { loading: true, order: null };
        case GET_SINGLE_ORDER_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, order: action.payload };
        case GET_SINGLE_ORDER_FAIL:
            return { loading: false, order: null, error: action.payload };
    }
    return state;
}

export const upiOrderReducer = (state = createUpiOrderState, action) => {
    switch (action.type){
        case UPI_ORDER_REQUEST:
            return { loading: true, order: null };
        case UPI_ORDER_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, order: action.payload };
        case UPI_ORDER_FAIL:
            return { loading: false, order: null, error: action.payload };
    }
    return state;
}