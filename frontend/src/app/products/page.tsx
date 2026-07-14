'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

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