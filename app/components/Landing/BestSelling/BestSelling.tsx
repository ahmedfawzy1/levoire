import Link from 'next/link';
import { getBestSellersProduct } from '@/app/lib/product';
import { Product } from '@/app/types/product';
import ItemCard from '../../shop/ItemCard';

export default async function BestSelling() {
  const latestProducts = await getBestSellersProduct();

  return (
    <section className='max-w-[1280px] mx-auto pt-8 pb-12'>
      <h3 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center'>
        Top Selling
      </h3>

      <div className='px-5 pt-10 pb-8 flex justify-between items-center gap-4 overflow-x-auto scrollbar-hide'>
        {latestProducts?.map((product: Product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>

      <div className='px-5 text-center'>
        <Link
          className='md:px-16 py-3 block md:w-fit rounded-full text-black mx-auto border border-black/10 transition duration-300 hover:bg-gray-200'
          href='/bestselling'
          prefetch={false}
        >
          View All
        </Link>
      </div>
    </section>
  );
}
