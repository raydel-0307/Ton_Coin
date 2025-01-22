// src/api/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/", // URL base de tu API
    headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer your_token_here", // Token de autorización si es necesario
    },
});

export default axiosInstance;
