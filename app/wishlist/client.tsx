'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getWishlist } from '../lib/wishlist';
import { Product } from '../types/product';

interface WishlistItem {
  id: number;
  productId: number;
  createdAt: string;
  product: Product;
}

export default function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();
  const userId = Number(user?.id);

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      const wishlist = await getWishlist(userId);
      setWishlist(wishlist);
      setLoading(false);
    };
    fetchWishlist();
  }, [userId]);

  return (
    <div className='px-5 py-14 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-extrabold mb-5'>Your Wishlist</h1>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p>No wishlist found.</p>
      ) : (
        wishlist.map(item => (
          <div
            key={item.id}
            className='border border-slate-800 rounded-xl p-4 mb-4'
          >
            <h2 className='text-xl font-semibold mb-2'>Wishlist #{item.id}</h2>
            <p className='text-gray-500'>
              Added on {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <div className='mt-4 space-y-4'>
              <div
                key={item.id}
                className='flex items-center gap-5 border-b pb-4 last:border-b-0 last:pb-0'
              >
                <div>
                  <Image
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className='rounded-full'
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {item.product.title}
                  </h3>
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
                  <p className='text-gray-600'>
                    Price: ${item.product.maxPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
