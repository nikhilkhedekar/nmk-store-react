import { productsState, productState } from "../initStates/productState";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL
} from "../types/productTypes"

export const productsReducer = (state = productsState, action) => {
    switch (action.type){
        case ALL_PRODUCTS_REQUEST:
            return { loading: true, products: null };
        case ALL_PRODUCTS_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, products: action.payload };
        case ALL_PRODUCTS_FAIL:
            return { loading: false, products: null, error: action.payload };
    }
    return state;
}

export const productReducer = (state = productState, action) => {
    switch (action.type){
        case PRODUCT_REQUEST:
            return { loading: true, product: null };
        case PRODUCT_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, product: action.payload };
        case PRODUCT_FAIL:
            return { loading: false, product: null, error: action.payload };
    }
    return state;
}