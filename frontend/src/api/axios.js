import axios from "axios"

const api = axios.create({
    baseURL: "https://lms-learning-management-system-k7zc.onrender.com/api",
    withCredentials: true,
});

export default api;