import Image from 'next/image';
import { getAllBrands } from '../lib/brands';
import generateSEO from '@/lib/seo';

export const revalidate = 3600;

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
    <section className='max-w-[1280px] mx-auto pt-14 pb-20 min-h-screen'>
      <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center mb-12'>
        Brands
      </h2>

      <div className='px-5 md:px-8'>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4'>
          {brands.map((brand: any) => (
            <div
              key={brand.id}
              className='group bg-[#FAFAFC] rounded-xl p-4 md:p-5 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer min-h-[100px] md:min-h-[120px]'
            >
              <div className='flex items-center justify-center w-full h-full'>
                <Image
                  src={brand?.image[0]}
                  className='w-full h-auto object-contain max-h-12 md:max-h-14'
                  alt={brand.name}
                  width={120}
                  height={50}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
