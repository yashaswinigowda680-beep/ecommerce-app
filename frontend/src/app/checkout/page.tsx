'use client';

import Navbar from '@/components/Navbar';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (
      !fullName ||
      !phoneNumber ||
      !address ||
      !city ||
      !pincode
    ) {
      alert('Please fill all shipping details');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login?redirect=/checkout');
        return;
      }

      await api.post(
        '/order',
        {
          fullName,
          phoneNumber,
          address,
          city,
          pincode,
          items: cart.map((item) => ({
            productId: item.id,
            productTitle: item.title,
            productThumbnail: item.thumbnail,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();

      router.push('/orders');
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="mx-auto max-w-6xl px-8 py-16">
          <h2 className="text-3xl font-serif font-semibold">
            Your cart is empty.
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 py-10">

        <h1 className="mb-8 text-5xl font-serif font-semibold text-[#2B1B12]">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_0.9fr]">

          {/* LEFT */}

                    {/* Full Name */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#3B2416]"
            />
          </div>

          {/* Phone */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#3B2416]"
            />
          </div>

          {/* Address */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#3B2416]"
            />
          </div>

          {/* City + ZIP */}

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#3B2416]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ZIP / Postal
              </label>

              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="ZIP"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#3B2416]"
              />
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-serif font-semibold text-[#2B1B12]">
            Your Order
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <hr className="my-5" />

          <div className="mb-6 flex items-center justify-between text-xl font-semibold">
            <span>Total</span>

            <span>
              ₹ {total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full rounded-xl bg-[#3B2416] py-3 text-base font-semibold text-white transition hover:bg-[#2B1B12]"
          >
            Place Order
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Demo storefront • No payment required
          </p>

        </div>

      

    </main>

    </>
  );
}