import { CURRENT_USER, FORGOT_PASSWORD, LOGIN_USER, LOGOUT_USER, REGISTER_USER, RESET_PASSWORD, VERIFY_EMAIL } from "../types/authTypes";
import AxiosInstance from "../axiosinstance";

export const authReducer = async (state, action) => {
    if (action.payload == CURRENT_USER) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const { data } = await AxiosInstance.get(`/api/v1/users/showMe`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            console.log("loggedInUser", data);
            AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;     
            return { ...state, user: data?.user, isLoggedIn: true }
        }
    } else if (action.type == REGISTER_USER) {
        console.log("reducer", action.payload);
        const { data } = await AxiosInstance.post(`/api/v1/auth/register`, action.payload);
        return { ...state, data };
    } else if (action.type == LOGIN_USER) {
        const { data, headers } = await AxiosInstance.post(`/api/v1/auth/login`, action.payload);
        localStorage.setItem("accessToken", data?.tokens?.accessToken);
        localStorage.setItem("refreshToken", data?.tokens?.refreshToken);
        AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data?.tokens?.accessToken}`;
        return { ...state, user: data?.user, isLoggedIn: true };
    } else if (action.type == LOGOUT_USER) {
        const { data } = await AxiosInstance.delete("/api/v1/auth/logout");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        AxiosInstance.defaults.headers.common["Authorization"] = ``;
        return { data, user: {}, isLoggedIn: false }
    } else if (action.type == VERIFY_EMAIL) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            const { data } = await AxiosInstance.post('/api/v1/auth/verify-email', action.payload);
            return { ...state, data };
        }
    } else if (action.type == FORGOT_PASSWORD) {
        const { data } = await AxiosInstance.post('/api/v1/auth/forgot-password', action.payload);
        return { ...state, data };
    } else if (action.type == RESET_PASSWORD) {
        const { data } = await AxiosInstance.post('/api/v1/auth/reset-password', action.payload);
        return { ...state, data };
    }
    return state;
}