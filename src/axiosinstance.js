import axios from "axios";

// const accessToken = localStorage.getItem("accessToken");
const AxiosInstance = axios.create({
    baseURL: "https://nmk-store-express.herokuapp.com",
});

// if(accessToken){
//     AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };

export default AxiosInstance