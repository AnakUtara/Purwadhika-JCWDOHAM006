import axiosInstance from "@/lib/axios/axios.config";
import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(endpoint: string, config?: AxiosRequestConfig) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axiosInstance.get<T>(endpoint, config);
			setData(response.data);
		} catch (err: Error | unknown) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [endpoint, config]);

	return { data, isLoading, error };
};

export default useFetch;
