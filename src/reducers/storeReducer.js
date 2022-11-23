import { getAllStoresState } from "../initStates/storeState";
import { GET_ALL_STORES_FAIL, GET_ALL_STORES_REQUEST, GET_ALL_STORES_SUCCESS } from "../types/storeTypes";

export const storesReducer = (state = getAllStoresState, action) => {
    switch (action.type){
        case GET_ALL_STORES_REQUEST:
            return { loading: true, stores: null };
        case GET_ALL_STORES_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, stores: action.payload };
        case GET_ALL_STORES_FAIL:
            return { loading: false, stores: null, error: action.payload };
    }
    return state;
}