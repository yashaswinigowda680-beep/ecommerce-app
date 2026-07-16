'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import Image from 'next/image';

import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { products, fetchProducts, loading } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl">Product not found</h2>
      </div>
    );
  }

  return (
  <>
    <Navbar />

    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Back */}

      <Link
        href="/"
        className="mb-8 inline-block text-gray-600 hover:text-black"
      >
        ← Back to shop
      </Link>

      <div className="grid gap-14 lg:grid-cols-2">

        {/* Left */}

        <div className="mx-auto flex h-[450px] w-[450px] items-center justify-center rounded-2xl bg-[#FCFAF7]">

          <Image
  src={product.thumbnail}
  alt={product.title}
  width={420}
  height={420}
  className="h-[420px] object-contain"
/>

        </div>

        {/* Right */}

        <div className="flex flex-col justify-center">

          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-2xl font-serif font-bold leading-tight text-[#2B1B12]">
            {product.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-gray-600">

            <div className="flex items-center gap-1">

              <Star
                size={16}
                fill="#f59e0b"
                className="text-amber-500"
              />

              <span>
                {product.rating}
              </span>

            </div>

            <span>•</span>

            <span>
              {product.stock} in stock
            </span>

            <span>•</span>

            <span>{product.brand}</span>

          </div>

          <h2 className="mt-8 text-2xl font-bold">
            ${product.price}
          </h2>

          <p className="mt-5 max-w-md text-[16px] leading-7 text-gray-600">
            {product.description}
          </p>

          <button
  onClick={() => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    toast.success('Added to cart', {
      description: product.title,
    });
  }}
  className="mt-10 w-40 rounded-xl bg-[#3B2416] py-2 text-lg font-semibold text-white transition hover:bg-[#2B1B12]"
>
  Add to cart
</button>

        </div>

      </div>

    </main>
    </>
  );
}