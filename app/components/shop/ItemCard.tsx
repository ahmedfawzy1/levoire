'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';
import ReactStars from 'react-rating-star-with-type';

export default function ItemCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className='select-none'>
      <div className='max-w-[198px] max-h-[303px] rounded-2xl flex justify-center'>
        <Image
          src={product.image[0]}
          alt={product.title}
          className='object-contain'
          width={780}
          height={1196}
          draggable={false}
        />
      </div>

      <h3 className='text-lg font-bold truncate max-w-48'>{product.title}</h3>
      <div className='flex gap-3 my-1'>
        <ReactStars
          value={product?.averageRating}
          isEdit={false}
          activeColors={['red', 'orange', '#FFCE00', '#9177FF', '#FFC633']}
        />
        <p className='text-sm'>
          {product?.averageRating}
          <span className='text-black/60'>/5</span>
        </p>
      </div>
      <div className='flex gap-2'>
        <p className='text-lg font-bold'>${product.maxPrice}</p>
        {product.minPrice > 0 && (
          <p className='text-[#000000a6] text-lg font-bold line-through'>
            ${product.minPrice}
          </p>
        )}
        {product.minPrice > 0 && (
          <div className='w-fit h-fit bg-red-200 rounded-3xl py-1 px-2 text-[0.75rem] text-red-800'>
            -{Math.round((1 - product.minPrice / product.maxPrice) * 100)}%
          </div>
        )}
      </div>
    </Link>
  );
}
