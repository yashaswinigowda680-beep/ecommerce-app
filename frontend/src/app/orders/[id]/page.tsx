'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

interface OrderItem {
  id: string;
  productTitle: string;
  productThumbnail: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;

  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  pincode: string;

  items: OrderItem[];
}

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get(`/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      void fetchOrder();
    }
  }, [id]);

  if (!order) {
    return <h2 style={{ padding: 30 }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Order Details</h1>

      <hr />

      <h3>Shipping Details</h3>

      <p><strong>Name:</strong> {order.fullName}</p>

      <p><strong>Phone:</strong> {order.phoneNumber}</p>

      <p><strong>Address:</strong> {order.address}</p>

      <p><strong>City:</strong> {order.city}</p>

      <p><strong>Pincode:</strong> {order.pincode}</p>

      <hr />

      <h3>Status : {order.status}</h3>

      <h3>Total : ₹ {order.totalAmount}</h3>

      <p>
        Ordered On{' '}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <hr />

      <h2>Products</h2>

      {order.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            gap: 20,
            marginBottom: 20,
            border: '1px solid #ddd',
            padding: 15,
            borderRadius: 8,
          }}
        >
          <img
            src={item.productThumbnail}
            width={120}
            alt={item.productTitle}
          />

          <div>
            <h3>{item.productTitle}</h3>

            <p>Quantity : {item.quantity}</p>

            <p>₹ {item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}