'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { getOrderByuserId } from '@/app/lib/orders';
import { Product } from '@/app/types/product';
import Loading from '../Loading';

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  maxPrice: number;
  minPrice: number;
  product: Product;
}

interface Order {
  id: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = Number(user?.id);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    if (success === '1') {
      localStorage.removeItem('cart');
    }
  }, [success]);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      const orders = await getOrderByuserId(userId);
      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className='px-5 py-14 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-extrabold mb-5'>Your Orders</h1>

      {orders.map(order => (
        <div
          key={order.id}
          className='border border-slate-800 rounded-xl p-4 mb-4'
        >
          <h2 className='text-xl font-semibold mb-2'>Order #{order.id}</h2>
          <p>
            Status: <span className='font-bold'>{order.status}</span>
          </p>
          <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className='mt-4 space-y-4'>
            {order.items.map(item => (
              <div
                key={item.id}
                className='flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b pb-4 last:border-b-0 last:pb-0'
              >
                <div className='flex-shrink-0 w-auto'>
                  <div className='relative w-20 sm:w-24 md:w-32 lg:w-40 aspect-square'>
                    <Image
                      src={item.product.image[0]}
                      alt={item.product.title}
                      className='rounded-lg object-cover'
                      fill
                      sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 160px'
                    />
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h3>{item.product.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.product.description,
                    }}
                  />
                  <p>
                    Store:{' '}
                    <span className='font-bold'>{item.product.store}</span>
                  </p>
                  <p className='font-bold'>Category: {item.product.category}</p>
                  <p className='font-bold'>Size: {item.size}</p>
                  <p className='font-bold' style={{ color: item.color }}>
                    Color: {item.color}
                  </p>
                  <p className='text-gray-600'>Quantity: {item.quantity}</p>
                  <p className='text-gray-600'>
                    Price: ${item.product.maxPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
