import { getAllLatestProduct } from '@/app/lib/product';
import { Product } from '@/app/types/product';
import ItemCard from '../components/shop/ItemCard';

export const revalidate = 3600;

export default async function NewArrivals() {
  const latestProducts = await getAllLatestProduct();

  return (
    <section className='max-w-[1280px] mx-auto pt-14 pb-8'>
      <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center'>
        NewArrivals
      </h2>

      <div className='px-5 pt-10 pb-8 flex flex-wrap justify-between items-center gap-4'>
        {latestProducts?.map((product: Product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
