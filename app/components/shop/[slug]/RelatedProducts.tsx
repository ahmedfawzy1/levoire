import { getBestSellersProduct } from '@/app/lib/product';
import { Product } from '@/app/types/product';
import ItemCard from '../ItemCard';

export default async function RelatedProducts() {
  const latestProducts = await getBestSellersProduct();

  return (
    <div className='max-w-[1280px] mx-auto pt-7'>
      <h3 className='text-3xl md:text-[38px] font-semibold font-integralCF text-center'>
        You might also like
      </h3>

      <div className='px-5 pt-10 pb-8 flex justify-between items-center gap-4 overflow-x-auto scrollbar-hide'>
        {latestProducts?.map((product: Product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
