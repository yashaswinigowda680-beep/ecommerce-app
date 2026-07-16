'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Navbar from '@/components/Navbar';
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login?redirect=/checkout');
      return;
    }

    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

       <div className="flex flex-col items-center justify-center text-center py-24">
  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
    Your cart is empty
  </h2>
  <p className="text-gray-500 mb-6">
    Browse the shop and add something you love.
  </p>
  <Link
    href="/"
    className="inline-block rounded-lg bg-[#3B1F0E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2e1709] transition"
  >
    Shop products
  </Link>
</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

     <main className="min-h-screen bg-[#FCF8F2]">
  <div className="mx-auto max-w-[1200px] px-8 py-10">

       <h1 className="mb-8 text-[32px] font-serif font-semibold text-[#2B1B12]">
  Your Cart
</h1>

        <div className="grid gap-20 lg:grid-cols-[2fr_1fr]">

          {/* Left Side */}

          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-start gap-6 border-b border-gray-200 pb-4"
              >

                {/* Product Image */}

                <div className="flex h-26 w-24 items-center justify-center rounded-2xl bg-[#F8F5EF]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-25 object-contain"
                  />
                </div>

                {/* Product Details */}

                <div className="flex-1">

                  <div className="flex items-start">

  <div className="flex-1">

  {/* Top Row */}

  <div className="flex justify-between">

    {/* Left */}

    <div>
      <h2 className="text-sm font-semibold">
        {item.title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        ₹ {item.price} each
      </p>
    </div>

    {/* Right */}

    <div className="flex flex-col items-end">

      <h2 className="text-l font-semibold">
        ₹ {(item.price * item.quantity).toFixed(2)}
      </h2>

      <button
        onClick={() => removeFromCart(item.id)}
        className="mt-2 flex items-center gap-0 text-xs text-gray-500 hover:text-red-500"
      >
        <Trash2 size={14} />
        Remove
      </button>

    </div>

  </div>

  {/* Quantity */}

  <div className="mt-5">

    <div className="flex h-8 w-24 items-center rounded-lg border border-gray-300">

      <button
        onClick={() => decreaseQuantity(item.id)}
        className="flex h-full w-8 items-center justify-center text-lg"
      >
        −
      </button>

      <span className="flex flex-1 items-center justify-center text-sm font-medium">
        {item.quantity}
      </span>

      <button
        onClick={() => increaseQuantity(item.id)}
        className="flex h-full w-8 items-center justify-center text-lg"
      >
        +
      </button>

    </div>

  </div>

</div>

                    

                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="h-fit w-[300px] rounded-3xl border border-[#E8E2D9] bg-white p-5">

            <h2 className="mb-5 text-xl font-serif font-bold">
              Summary
            </h2>

            <div className="mb-2 flex justify-between text-s">
              <span>Subtotal</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <div className="mb-2 flex justify-between text-s">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="my-2 flex justify-between text-s font-bold">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-[#3B2416] py-2 text-lg font-semibold text-white transition hover:bg-[#2B1B12]"
            >
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="mt-2 w-full rounded-xl border border-gray-300 py-2 font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Clear Cart
            </button>

          </div>

        </div>
        </div>

      </main>
    </>
  );
}