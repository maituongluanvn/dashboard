'use client'
import { useState, useEffect } from 'react';

interface ApiResponse<T> {
	data: T;
	loading: boolean;
	error: Error | null;
}

type FetchProps = {
	endpoint: string;
	method?: string;
	headers?: Record<string, string>;
	body?: any;
};

const useFetch = <T>(props: FetchProps): ApiResponse<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { endpoint, method = 'GET', headers, body } = props;
	const [data, setData] = useState(null as unknown as T);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
				console.log("🚀 ~ fetchData ~ fetchUrl:", fetchUrl)
				const response = await fetch(fetchUrl, {
					method,
					headers: {
						'Content-Type': 'application/json',
						...headers,
					},
					body: JSON.stringify(body),
				});
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = (await response.json()) as T;
				setData(result);
			} catch (error: any) {
				console.error('Got error when fetching', error);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		void fetchData();
	}, [endpoint, method, headers, body]);

	return { data, loading, error };
};

export default useFetch;
