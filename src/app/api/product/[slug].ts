// src/app/api/product/[slug].ts

// Example data (can be fetched from a database, another API, etc.)
const products = [
  { id: 1, slug: 'product-1', name: 'Product 1', price: 10 },
  { id: 2, slug: 'product-2', name: 'Product 2', price: 20 },
  { id: 3, slug: 'product-3', name: 'Product 3', price: 30 },
];

export default function handler(req, res) {
  const { slug } = req.query;

  // Tìm sản phẩm theo slug trong danh sách products
  const product = products.find(prod => prod.slug === slug);
  console.log("🚀 ~ handler ~ product:", product)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Trả về thông tin của sản phẩm nếu tìm thấy
  res.status(200).json(product);
}
