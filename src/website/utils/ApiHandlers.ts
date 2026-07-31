import axios from "axios";

export const apiHandler = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});



apiHandler.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiHandler.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);   
});