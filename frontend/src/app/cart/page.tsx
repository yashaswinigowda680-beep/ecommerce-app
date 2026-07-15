'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Navbar from '@/components/Navbar';

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

        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="mb-4 text-5xl font-serif font-bold">
            Your Cart
          </h1>

          <p className="text-xl text-gray-500">
            Your cart is empty 🛒
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-14">

        <h1 className="mb-12 text-5xl font-serif font-bold">
          Your Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Left Side */}

          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-8 flex items-start gap-6 border-b border-gray-200 pb-8"
              >

                {/* Product Image */}

                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-[#F8F5EF]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 object-contain"
                  />
                </div>

                {/* Product Details */}

                <div className="flex-1">

                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-lg text-gray-500">
                        ₹ {item.price} each
                      </p>

                    </div>

                    <h2 className="text-2xl font-semibold">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </h2>

                  </div>

                  {/* Quantity */}

                  <div className="mt-6 flex items-center gap-4">

                    <div className="flex items-center rounded-xl border">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-4 py-2 text-xl"
                      >
                        −
                      </button>

                      <span className="px-4">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-4 py-2 text-xl"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-3xl font-serif font-bold">
              Summary
            </h2>

            <div className="mb-4 flex justify-between text-lg">
              <span>Subtotal</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <div className="mb-6 flex justify-between text-lg">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="my-6 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-[#3B2416] py-4 text-lg font-semibold text-white transition hover:bg-[#2B1B12]"
            >
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Clear Cart
            </button>

          </div>

        </div>

      </main>
    </>
  );
}