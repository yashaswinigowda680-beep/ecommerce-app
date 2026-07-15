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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!fullName || !phoneNumber || !address || !city || !pincode) {
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
        { headers: { Authorization: `Bearer ${token}` } }
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
          <h2 className="text-3xl font-serif font-semibold">Your cart is empty.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FCF8F2]">
      
      <div className="mx-auto max-w-4xl px-8 py-10">
        <h1 className="mb-8 text-2xl font-serif font-semibold text-[#2B1B12]">Checkout</h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_0.9fr]">
          {/* LEFT — everything wrapped in one div, so this whole block is ONE grid column */}
          <div>
            <h2 className="mb-4 text-3 font-serif font-semibold text-[#2B1B12]">Shipping details</h2>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#3B2416]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#3B2416]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#3B2416]"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#3B2416]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">ZIP / Postal</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="ZIP"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-[#3B2416]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — sibling of the LEFT div, both inside the same grid, so this is correctly the second column */}
          <div className="sticky top-24 self-start w-[340px] rounded-3xl border border-[#E8E2D9] bg-white p-5">

  <h2 className="mb-3 text-[20px] font-serif font-semibold text-[#2B1B12]">
    Your order
  </h2>

  {cart.map((item) => (
    <div
      key={item.id}
      className="mb-3 flex items-center justify-between"
    >
      <div className="min-w-0">
        <p className="max-w-[190px] truncate text-[15px] text-[#2B1B12]">
          {item.title}
        </p>

        <p className="text-[12px] text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>

      <p className="whitespace-nowrap text-[16px] font-medium text-[#2B1B12]">
        ₹ {(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  ))}

  <hr className="my-2 border-[#E8E2D9]" />

  <div className="mb-2 flex items-center justify-between">
    <span className="text-[15px] font-semibold text-[#2B1B12]">
      Total
    </span>

    <span className="text-[16px] font-semibold text-[#2B1B12]">
      ₹ {total.toFixed(2)}
    </span>
  </div>

  <button
    onClick={handlePlaceOrder}
    className="w-full rounded-xl bg-[#3B2416] py-1.5 text-[16px] font-semibold text-white hover:bg-[#2B1B12]"
  >
    Place order
  </button>

  <p className="mt-3 text-center text-[14px] text-gray-500">
    Demo • No payment required
  </p>

</div>
        </div>
        </div>
      </main>
    </>
  );
}