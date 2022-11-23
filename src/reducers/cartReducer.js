import { cartCheckoutState, cartItemDetailsState, cartState, currentUserCartState, updateCartState, upiCheckoutState } from "../initStates/cartState";
import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, CART_CHECKOUT_FAIL, CART_CHECKOUT_REQUEST, CART_CHECKOUT_SUCCESS, CART_ITEM_DETAILS_FAIL, CART_ITEM_DETAILS_REQUEST, CART_ITEM_DETAILS_SUCCESS, CHECKOUT_UPI_FAIL, CHECKOUT_UPI_REQUEST, CHECKOUT_UPI_SUCCESS, CURRENT_USER_CART_FAIL, CURRENT_USER_CART_REQUEST, CURRENT_USER_CART_SUCCESS, UPDATE_CART_FAIL, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS } from "../types/cartTypes";

export const addToCartReducer = (state = cartState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { loading: true, cart: null, error: null };
        case ADD_TO_CART_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case ADD_TO_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const currentUserCartReducer = (state = currentUserCartState, action) => {
    switch (action.type) {
        case CURRENT_USER_CART_REQUEST:
            return { loading: true, cart: null, error: null };
        case CURRENT_USER_CART_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case CURRENT_USER_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const cartItemDetailsReducer = (state = cartItemDetailsState, action) => {
    switch (action.type) {
        case CART_ITEM_DETAILS_REQUEST:
            return { loading: true, cart: null, error: null };
        case CART_ITEM_DETAILS_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case CART_ITEM_DETAILS_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const cartCheckoutReducer = (state = cartCheckoutState, action) => {
    switch (action.type) {
        case CART_CHECKOUT_REQUEST:
            return { loading: true, cart: null, error: null };
        case CART_CHECKOUT_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case CART_CHECKOUT_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const updateCartReducer = (state = updateCartState, action) => {
    switch (action.type) {
        case UPDATE_CART_REQUEST:
            return { loading: true, cart: null, error: null };
        case UPDATE_CART_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case UPDATE_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const upiCartCheckoutReducer = (state = upiCheckoutState, action) => {
    switch (action.type) {
        case CHECKOUT_UPI_REQUEST:
            return { loading: true, cart: null, error: null };
        case CHECKOUT_UPI_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, cart: action.payload, error: null };
        case CHECKOUT_UPI_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}