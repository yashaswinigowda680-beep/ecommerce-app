'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';

export default function ProductsPage() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>

      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              border: '1px solid #ccc',
              marginBottom: '15px',
              padding: '10px',
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              width={120}
            />

            <h3>{product.title}</h3>

            <p>₹ {product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}