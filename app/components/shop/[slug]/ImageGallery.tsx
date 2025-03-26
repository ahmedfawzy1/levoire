'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  getWishlistByProduct,
  addToWishlist,
  removeFromWishlist,
} from '@/app/lib/wishlist';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageGalleryProps {
  ImageUrls: string[];
  userId: number;
  productId: number;
}

export default function ImageGallery({
  ImageUrls,
  userId,
  productId,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchWishlist = async () => {
      const wishlist = await getWishlistByProduct(userId, productId);
      setIsWishlisted(wishlist);
    };
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const toggleWishlist = async () => {
    if (!userId) {
      toast.error('⚠️ Please login to add items to your wishlist');
      return;
    }
    if (isWishlisted) {
      setIsWishlisted(false);
      toast.success('Removed from your wishlist');
      await removeFromWishlist(productId);
    } else {
      setIsWishlisted(true);
      toast.success('Added to your wishlist');
      await addToWishlist(productId);
    }
  };

  return (
    <div className='flex flex-col-reverse md:flex-row basis-1/2 gap-3'>
      <div className='flex flex-row md:flex-col justify-between md:justify-start gap-3'>
        {ImageUrls.slice(0, 3).map((url, index) => (
          <div key={index} className='bg-[#F0EEED] max-w-fit rounded-lg'>
            <Image
              onClick={() => setSelectedImage(index)}
              className={`w-[104px] h-[138px] rounded-lg object-cover object-top ${
                selectedImage === index ? 'border border-black' : ''
              }`}
              width={780}
              height={1196}
              src={url}
              alt={url}
              priority
            />
          </div>
        ))}
      </div>
      <div className='w-full h-fit bg-[#F0EEED] rounded-lg relative'>
        <Image
          className='w-full h-[440px] object-cover object-top rounded-lg'
          src={ImageUrls[selectedImage]}
          alt={'product'}
          width={780}
          height={1196}
          priority
        />
        <button
          className={`absolute top-2 right-2 z-50 ${
            isWishlisted ? 'text-red-500' : 'text-gray-500'
          }`}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist();
          }}
          aria-label='add to wishlist'
        >
          <Heart size={20} fill={isWishlisted ? 'red' : 'none'} />
        </button>
      </div>
    </div>
  );
}
