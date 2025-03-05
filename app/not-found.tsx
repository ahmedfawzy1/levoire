import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className='bg-gray-100 h-[calc(100vh-160px)] flex flex-col justify-center items-center'>
      <div>
        <Image
          src={'/images/icons/notfound.svg'}
          width={218}
          height={218}
          alt='Not Found'
        />
      </div>
      <div className='mt-4 flex flex-col justify-center items-center gap-5'>
        <span className='text-gray-500 text-5xl md:text-6xl font-extrabold'>
          4 0 4
        </span>
        <span className='text-gray-500 md:text-xl'>
          Sorry, We couldn't find what you are looking for!
        </span>
        <Link
          href='/'
          className='text-gray-500 md:text-lg bg-gray-200 p-3 rounded-md transition hover:shadow-md'
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
