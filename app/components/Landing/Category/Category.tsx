import Link from 'next/link';
import Image from 'next/image';

export default function Category() {
  const categories = [
    {
      href: '/shop?style=Casual',
      src: '/images/category/casual.avif',
      alt: 'casual wear category',
      label: 'Casual',
      width: 407,
      height: 289,
      basis: 'md:basis-1/3',
    },
    {
      href: '/shop?style=Formal',
      src: '/images/category/formal.avif',
      alt: 'formal wear category',
      label: 'Formal',
      width: 684,
      height: 289,
      basis: 'md:basis-2/3',
    },
  ];
  const categories2 = [
    {
      href: '/shop?style=Party',
      src: '/images/category/party.avif',
      alt: 'party wear category',
      label: 'Party',
      width: 642,
      height: 289,
      basis: 'md:basis-2/3',
    },
    {
      href: '/shop?style=Gym',
      src: '/images/category/gym.avif',
      alt: 'gym wear category',
      label: 'Gym',
      width: 354,
      height: 289,
      basis: 'md:basis-1/3',
    },
  ];

  return (
    <section className='max-w-[1280px] mx-auto p-4 md:px-16 md:py-20 bg-[#F0F0F0] rounded-xl'>
      <h4 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center mb-12'>
        BROWSE BY dress STYLE
      </h4>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-4'>
          {categories.map(category => (
            <Link
              key={category.href}
              href={category.href}
              className={`relative basis-full ${category.basis}`}
              prefetch={false}
            >
              <Image
                className='w-full h-full rounded-xl object-cover'
                src={category.src}
                alt={category.alt}
                width={category.width}
                height={category.height}
              />
              <h4 className='text-xl md:text-3xl font-semibold absolute top-3 left-3 md:top-6 md:left-5'>
                {category.label}
              </h4>
            </Link>
          ))}
        </div>
        <div className='flex flex-row gap-4'>
          {categories2.map(category => (
            <Link
              key={category.href}
              href={category.href}
              className={`relative basis-full ${category.basis}`}
              prefetch={false}
            >
              <Image
                className='w-full h-full rounded-xl object-cover'
                src={category.src}
                alt={category.alt}
                width={category.width}
                height={category.height}
              />
              <h4 className='text-xl md:text-3xl font-semibold absolute top-3 left-3 md:top-6 md:left-5'>
                {category.label}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
