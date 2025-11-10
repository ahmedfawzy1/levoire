'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getWishlist, removeFromWishlist } from '../lib/wishlist';
import { Product } from '../types/product';
import Loading from '../components/Loading';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

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

  if (loading) {
    return <Loading />;
  }

  if (wishlist.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>No wishlist found.</p>
      </div>
    );
  }

  const handleRemoveFromWishlist = async (productId: number) => {
    setWishlist(wishlist.filter(item => item.productId !== productId));
    await removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  return (
    <div className='px-5 py-14 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-extrabold mb-5'>Your Wishlist</h1>
      {wishlist.map(item => (
        <div
          key={item.id}
          className='border border-slate-800 rounded-xl p-4 mb-4'
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold mb-2'>Wishlist #{item.id}</h2>
            <button onClick={() => handleRemoveFromWishlist(item.productId)}>
              <Trash2 size={20} />
            </button>
          </div>
          <p className='text-gray-500'>
            Added on {new Date(item.createdAt).toLocaleDateString()}
          </p>
          <div className='mt-4 space-y-4'>
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
                <Link
                  href={`/shop/${item.product.slug}`}
                  className='text-lg font-semibold'
                >
                  {item.product.title}
                </Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.product.description,
                  }}
                />
                <p>
                  Store: <span className='font-bold'>{item.product.store}</span>
                </p>
                <p className='font-bold'>Category: {item.product.category}</p>
                <p className='text-gray-600'>Price: ${item.product.maxPrice}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
