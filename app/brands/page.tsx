import Image from 'next/image';
import { getAllBrands } from '../lib/brands';
import generateSEO from '@/lib/seo';

export const generateMetadata = async () => {
  return generateSEO({
    title: 'Shop Top Fashion Brands | Premium Clothing & Accessories | Levoire',
    description:
      'Discover a curated collection of top fashion brands at Levoire. Shop high-quality clothing, footwear, and accessories from your favorite designers. Explore now!',
  });
};

export default async function page() {
  const brands = await getAllBrands();

  return (
    <section className='max-w-[1280px] h-screen mx-auto pt-14 pb-8'>
      <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center'>
        Brands
      </h2>

      <div className='px-5 pt-10 pb-8 flex flex-wrap justify-between items-center gap-4'>
        {brands.map((brand: any) => (
          <div
            key={brand.id}
            className='max-w-[200px] px-4 py-6 bg-[#FAFAFC] rounded-xl'
          >
            <Image
              src={brand?.image[0]}
              className='w-full object-cover'
              alt={brand.name}
              width={70}
              height={12}
            />
            <h3 className='text-sm md:text-[18px] pt-2 font-semibold font-integralCF text-center'>
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
