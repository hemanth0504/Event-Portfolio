import axios from "axios";

console.log("✅ Using custom axios instance");

const axiosInstance = axios.create({
	baseURL: import.meta.env.DEV ? "http://localhost:3000/api" : "/api",
	withCredentials: true,
});

export default axiosInstance;
