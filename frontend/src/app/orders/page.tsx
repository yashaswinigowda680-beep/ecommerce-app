'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

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
    return <h2 style={{ padding: 30 }}>Loading Orders...</h2>;
  }

  if (orders.length === 0) {
    return <h2 style={{ padding: 30 }}>No Orders Found</h2>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              marginTop: '20px',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3>Order #{order.id.slice(0, 8)}</h3>

                <p>
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <p>Status: {order.status}</p>
              </div>

              <h2>₹ {order.totalAmount.toFixed(2)}</h2>
            </div>

            <hr />

            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '20px',
                  marginTop: '15px',
                }}
              >
                <img
                  src={item.productThumbnail}
                  width={90}
                  alt={item.productTitle}
                />

                <div>
                  <h4>{item.productTitle}</h4>

                  <p>Qty : {item.quantity}</p>

                  <p>₹ {item.price}</p>
                </div>
              </div>
            ))}

            <hr />

            <p>
              Ships to {order.fullName}, {order.city},
              {order.pincode}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}