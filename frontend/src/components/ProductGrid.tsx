'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';

export default function ProductGrid() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              
              {/* Product Image */}
              <div className="flex h-72 items-center justify-center bg-[#F8F5EF]">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-56 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-2 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  {product.category}
                </p>

                <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-gray-900">
                  {product.title}
                </h3>

                <p className="pt-2 text-xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}