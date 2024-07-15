'use client';
import { useState, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT';

interface IApiResponse<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

const useFetch = <T>(url: string, method: HttpMethod = 'GET', bodyData?: any): IApiResponse<T | null> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requestOptions: RequestInit = {
					method,
					headers: { 'Content-Type': 'application/json' },
					body: bodyData ? JSON.stringify(bodyData) : undefined,
				};

				const response = await fetch(url, requestOptions);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = (await response.json()) as T;
				setData(result);
			} catch (error: any) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		void fetchData();
	}, [url, method, bodyData]);
	return { data, loading, error };
};

export default useFetch;
