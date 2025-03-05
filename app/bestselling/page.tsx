import { getAllBestSellersProduct } from '@/app/lib/product';
import { Product } from '@/app/types/product';
import ItemCard from '../components/shop/ItemCard';

export default async function page() {
  const latestProducts = await getAllBestSellersProduct();

  return (
    <section className='max-w-[1280px] mx-auto pt-8 pb-12'>
      <h3 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center'>
        Top Selling
      </h3>

      <div className='px-5 pt-10 pb-8 flex flex-wrap justify-between items-center gap-4'>
        {latestProducts?.map((product: Product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
