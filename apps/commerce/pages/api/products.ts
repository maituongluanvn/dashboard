import type { NextApiRequest, NextApiResponse } from 'next';
import type { IProduct } from '@cores/definition'; // Hoặc định nghĩa của bạn

// Mock database or storage
const mockDatabase: IProduct[] = []; // Đây là một ví dụ, trong thực tế bạn có thể sử dụng cơ sở dữ liệu thật

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			try {
				// Giả sử bạn lấy dữ liệu từ cơ sở dữ liệu hoặc một API bên ngoài
				res.status(200).json(mockDatabase);
			} catch (error) {
				res.status(500).json({ error: 'Failed to fetch products' });
			}
			break;

		case 'POST':
			try {
				const newProduct: IProduct = req.body;
				if (!newProduct?.name || !newProduct.price) {
					return res.status(400).json({ error: 'Invalid product data' });
				}
				// Thêm sản phẩm vào mock database
				mockDatabase.push(newProduct);

				res.status(201).json(newProduct);
			} catch (error) {
				res.status(500).json({ error: 'Failed to add product' });
			}
			break;

		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
