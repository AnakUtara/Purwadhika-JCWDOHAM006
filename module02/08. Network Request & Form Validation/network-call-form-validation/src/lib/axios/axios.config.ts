import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		"https://api.backendless.com/BC88BC3F-5A10-4ED8-829C-89F70D24A5AB/36946EBE-E035-43F8-A29F-AED903BCB3D9/data",
	headers: {
		"Content-Type": "application/json",
	},
	params: {
		sortBy: "created DESC",
	},
});

export default axiosInstance;
