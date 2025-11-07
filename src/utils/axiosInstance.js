import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{

    const token = localStorage.getItem("token");

        if (token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }

)

axiosInstance.interceptors.response.use(
    (response) =>  {
        // Just return the successful response data
        return response.data;
    },

    // Error Handler: Runs if the request encounters an error (network error or non-2xx status code)
    (error) => {
        if (error.response) {          
            if (error.response.status === 401) {
                console.warn("Unauthorized (401): Token may be expired or missing.");
            } 
            // --- 500 Server Error Handling ---
            else if (error.response.status === 500) {
                // Log a generic server error message
                console.error("Server error. Please try again later.");
            }
        } 
        // --- Request Timeout Handling ---
        else if (error.code === "ECONNABORTED") {
            // Check for the specific Axios code for request timeout
            console.error("Request timeout. Please try again.");
        }

        // Must reject the promise so that the component calling the API can catch the error
        return Promise.reject(error);
    }
);


export default axiosInstance;