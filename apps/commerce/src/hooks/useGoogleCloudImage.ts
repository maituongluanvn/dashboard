import { useState, useEffect } from 'react';

interface IUseGoogleCloudImageProps {
	imageUrl: string; // Nhận vào URL của ảnh
}

const useGoogleCloudImage = ({ imageUrl }: IUseGoogleCloudImageProps) => {
	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImage = async () => {
			setLoading(true);
			try {
				const response = await fetch(imageUrl);
				if (!response.ok) {
					throw new Error('Failed to fetch image');
				}
				setUrl(imageUrl); // Nếu ảnh tồn tại, đặt URL của ảnh vào state
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		void fetchImage();
	}, [imageUrl]);

	return { url, loading, error };
};

export default useGoogleCloudImage;
