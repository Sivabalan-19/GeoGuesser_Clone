import axios from "axios";

// Resolve API base URL. Prefer env var, fallback to local server.
const API_BASE_URL =
	(typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
	"http://localhost:5000/api";

// Pre-configured axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Basic GET helper
export async function get(url, config) {
	const response = await api.get(url, config);
	return response.data;
}

// Basic POST helper
export async function post(url, data, config) {
	const response = await api.post(url, data, config);
	return response.data;
}

export default api;
