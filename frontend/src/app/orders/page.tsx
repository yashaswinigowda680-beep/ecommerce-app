'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import Image from 'next/image';

interface OrderItem {
  id: string;
  productId: number;
  productTitle: string;
  productThumbnail: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  fullName: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/order', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FCF8F2]">
          <div className="mx-auto max-w-5xl px-8 py-12">
            <h2>Loading Orders...</h2>
          </div>
        </main>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FCF8F2]">
          <div className="mx-auto max-w-5xl px-8 py-12">
            <h2>No Orders Found</h2>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FCF8F2]">
        <div className="mx-auto max-w-3xl px-8 py-12">

          <h1 className="mb-10 text-[28px] font-serif font-semibold text-[#2B1B12]">
            My orders
          </h1>

       {orders.map((order) => (
  <div
    key={order.id}
    className="mb-8 rounded-3xl border border-[#E8E2D9] bg-white p-5 transition hover:shadow-md"
  >

                {/* Header */}

                <div className="mb-1 flex items-start justify-between">

                  <div>

                    <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                      Order · {order.id.slice(0, 8)}
                    </p>

                    <p className="mt-1 text-[13px] text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="text-xl font-semibold text-[#2B1B12]">
                      ₹ {order.totalAmount.toFixed(2)}
                    </h2>

                    <span className="mt-2 inline-block rounded-full bg-[#F8E9DC] px-1 py-0 text-sm font-medium text-[#8B5E3C]">
                      Placed
                    </span>

                  </div>

                </div>

                {/* Products */}

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-t border-[#E8E2D9] py-5"
                  >
                    <div className="flex items-center gap-4">

                      <div className="flex h-16 w-18 items-center justify-center rounded-xl bg-[#F8F5EF]">

                       <Image
  src={item.productThumbnail}
  alt={item.productTitle}
  width={60}
  height={60}
  className="h-15 object-contain"
/>

                      </div>

                      <div>

                        <h3 className="text-[15px] font-small text-[#2B1B12]">
                          {item.productTitle}
                        </h3>

                        <p className="text-gray-500">
                          Qty {item.quantity}
                        </p>

                      </div>

                    </div>

                    <p className="text-s font-medium text-[#2B1B12]">
                      ₹ {item.price.toFixed(2)}
                    </p>

                  </div>
                ))}

                {/* Shipping */}

                <p className="mt-2 text-small text-gray-600">
                  Ships to{' '}
                  <span className="font-small">
                    {order.fullName}
                  </span>
                  , {order.city}, {order.pincode}
                </p>

              </div>
            
          ))}

        </div>
      </main>
    </>
  );
}