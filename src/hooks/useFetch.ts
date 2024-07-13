import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(endpoint: string): ApiResponse<T> => {
  const [data, setData] = useState(null as unknown as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
        const response = await fetch(fetchUrl);
        console.log("🚀 ~ fetchData ~ fetchUrl:", fetchUrl)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: any = await response.json();
        setData(result.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
