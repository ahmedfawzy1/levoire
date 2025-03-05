'use client';

import { useContext } from 'react';
import ProductContext from '@/app/context/ProductContext';
import ItemCard from './ItemCard';
import { ArrowLeft, ArrowRight, SlidersVertical } from 'lucide-react';

interface filterProps {
  showFilter: boolean;
  setShowFilter: (showFilter: boolean) => void;
}

export default function Products({ showFilter, setShowFilter }: filterProps) {
  const { products, page, setPage, totalPages } = useContext(ProductContext);

  if (!products.length) {
    return <div className='w-full'>No products found.</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className='w-full'>
      <h1 className='sr-only'>Shop the Latest Fashion Trends at Levoire</h1>
      <div className='w-full md:hidden flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold'>Filters</h3>
        <SlidersVertical
          color='#00000066'
          size={18}
          onClick={() => setShowFilter(!showFilter)}
          className='cursor-pointer'
        />
      </div>
      <div className='w-full min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {products.map(product => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
      <hr className='mx-3 my-5 border-t border-t-black/10' />
      <div className='px-3 flex justify-between gap-3'>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className={`px-3 pr-4 text-sm font-medium border border-black/10 rounded-lg flex justify-center items-center gap-2 transition duration-500 ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/5'
          }`}
        >
          <>
            <ArrowLeft size={18} />
            Previous
          </>
        </button>
        <div className='flex gap-3'>
          {[...Array(totalPages).keys()].map(p => (
            <button
              key={p + 1}
              disabled={page === p + 1}
              className={`px-4 py-2 rounded-lg transition duration-500 hover:bg-black/5 ${
                page === p + 1 ? 'bg-black/5' : ''
              }`}
              onClick={() => handlePageChange(p + 1)}
            >
              {p + 1}
            </button>
          ))}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className={`px-3 pl-4 text-sm font-medium border border-black/10 rounded-lg flex justify-center items-center gap-2 transition duration-500 ${
            page === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-black/5'
          }`}
        >
          <>
            Next
            <ArrowRight size={18} />
          </>
        </button>
      </div>
    </div>
  );
}
