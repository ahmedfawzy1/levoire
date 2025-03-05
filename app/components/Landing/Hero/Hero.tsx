import Link from 'next/link';
import Image from 'next/image';

export default async function Hero() {
  return (
    <section className='w-full relative bg-[#F2F0F1] flex flex-col md:flex-row justify-between items-center'>
      <div className='px-6 max-w-[577px] min-h-[585px] flex flex-col justify-center items-center'>
        <div className='text-center md:text-left'>
          <h1 className='text-4xl md:text-6xl font-semibold font-integralCF mb-5'>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className='text-sm md:text-base text-black/60 mb-8'>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            href='/shop'
            className='px-12 py-3 rounded-full bg-black text-white transition duration-300 hover:bg-gray-800'
          >
            Shop Now
          </Link>
        </div>
        <div className='w-full flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-5 mt-10'>
          <div className='min-[340px]:border-r border-black/10 text-center min-[340px]:pr-5 md:pr-7'>
            <p className='text-2xl md:text-4xl font-bold'>200+</p>
            <span className='text-black/60 text-[12px]'>
              International Brands
            </span>
          </div>
          <div className='min-[454px]:border-r border-black/10 min-[454px]:pr-5 md:pr-7'>
            <p className='text-2xl md:text-4xl font-bold'>2,000+</p>
            <span className='text-black/60 text-[12px]'>
              High-Quality Products
            </span>
          </div>
          <div>
            <p className='text-2xl md:text-4xl font-bold'>30,000+</p>
            <span className='text-black/60 text-[12px]'>Happy Customers</span>
          </div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Image
          priority
          src='/images/hero/banner.avif'
          alt='hero'
          width={604}
          height={644}
          draggable={false}
        />
      </div>
    </section>
  );
}
