import Image from 'next/image';

const brands = [
  {
    src: '/images/brands/versace.webp',
    alt: 'Versace',
    width: 167,
    height: 34,
  },
  {
    src: '/images/brands/zara.webp',
    alt: 'Zara',
    width: 91,
    height: 38,
  },
  {
    src: '/images/brands/gucci.webp',
    alt: 'Gucci',
    width: 157,
    height: 36,
  },
  {
    src: '/images/brands/prada.webp',
    alt: 'Prada',
    width: 195,
    height: 32,
  },
  {
    src: '/images/brands/calvin-klein.webp',
    alt: 'Calvin Klein',
    width: 208,
    height: 34,
  },
];

export default function Brands() {
  return (
    <section className='px-2 py-7 md:px-6 md:py-10 bg-black flex flex-wrap justify-evenly items-center gap-5'>
      {brands.map((brand, index) => (
        <div key={index} className='w-auto px-3 relative'>
          <Image
            priority
            src={brand.src}
            alt={brand.alt}
            width={brand.width}
            height={brand.height}
            className='max-w-20 md:max-w-full'
            draggable={false}
          />
        </div>
      ))}
    </section>
  );
}
