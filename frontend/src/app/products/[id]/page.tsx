'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    if (id) {
      void fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        width={250}
      />

      <h1>{product.title}</h1>

      <h3>₹ {product.price}</h3>

      <p>{product.description}</p>
    </div>
  );
}