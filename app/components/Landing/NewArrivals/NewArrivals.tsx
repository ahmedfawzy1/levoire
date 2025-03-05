import Link from 'next/link';
import { getLatestProduct } from '@/app/lib/product';
import { Product } from '@/app/types/product';
import ItemCard from '../../shop/ItemCard';

export default async function NewArrivals() {
  const latestProducts = await getLatestProduct();

  return (
    <section className='max-w-[1280px] mx-auto pt-14 pb-8'>
      <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center'>
        NewArrivals
      </h2>

      <div className='px-5 pt-10 pb-8 flex justify-between items-center gap-5 overflow-x-auto scrollbar-hide'>
        {latestProducts?.map((product: Product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>

      <div className='px-5 text-center'>
        <Link
          className='md:px-16 py-3 block md:w-fit rounded-full text-black mx-auto border border-black/10 transition duration-300 hover:bg-gray-200'
          href='/newarrivals'
          prefetch={false}
        >
          View All
        </Link>
      </div>
      <hr className='bg-black/10 mt-14' />
    </section>
  );
}
