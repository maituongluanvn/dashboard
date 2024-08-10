import { ProductList } from '@/ui/components/ProductList';
import type { IProduct } from '@cores/definition';

// Hàm bất đồng bộ để lấy dữ liệu sản phẩm
async function getProducts(): Promise<IProduct[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product`);
	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}
	return response.json();
}

// Server Component
const Page = async () => {
	try {
		// Gọi hàm getProducts để lấy dữ liệu
		const products = await getProducts();
		console.log('🚀 ~ products:', products);

		// Trả về giao diện với dữ liệu sản phẩm
		return (
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		);
	} catch (error) {
		console.error('Failed to fetch products:', error);
		// Xử lý lỗi (có thể hiển thị một thông báo lỗi hoặc một trạng thái lỗi nào đó)
		return <p>Error fetching products</p>;
	}
};

export default Page;
