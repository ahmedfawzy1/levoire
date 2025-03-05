'use client';

import { useState, Suspense } from 'react';
import Filters from '../components/shop/Filters';
import Products from '../components/shop/Products';

export default function Shop() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <section className='px-5 py-2 md:py-10 max-w-[1280px] mx-auto min-h-screen'>
      <div className='flex flex-row justify-between items-start gap-8'>
        <Suspense fallback={<p>Loading</p>}>
          <div className='md:h-full h-screen fixed left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 md:relative overflow-y-auto'>
            <Filters showFilter={showFilter} setShowFilter={setShowFilter} />
          </div>
        </Suspense>
        <Products showFilter={showFilter} setShowFilter={setShowFilter} />
      </div>
    </section>
  );
}
