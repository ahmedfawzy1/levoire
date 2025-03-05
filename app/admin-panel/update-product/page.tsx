'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Product } from '@/app/types/product';
import ProductContext from '@/app/context/ProductContext';
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UpdateProduct() {
  const { products, page, setPage, totalPages } = useContext(ProductContext);

  if (!products.length) {
    return <div>No products found.</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleDeleteProduct = async (slug: string) => {
    try {
      const response = await axios.delete(`/api/update_product/${slug}`);

      if (response.status === 200) {
        window.location.reload();

        toast.success('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='relative px-1 md:px-3'>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto text-sm font-semibold overflow-x-auto'>
          <thead className='text-[10px] md:text-xs text-black/80 uppercase bg-gray-50 border-b border-b-black/10'>
            <tr className='md:truncate'>
              <th className='py-3'>Product Name</th>
              <th className='py-3'>Max Price</th>
              <th className='py-3'>Min Price</th>
              <th className='py-3'>Inventory</th>
              <th className='py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className='text-center border-b border-b-black/10 last:border-0'
              >
                <td className='py-2 max-w-28 truncate'>
                  <Link
                    className='flex items-center gap-3'
                    href={`/shop/${product.slug}`}
                  >
                    <div className='max-w-[46px] max-h-[70px] flex justify-center'>
                      <Image
                        src={product.image[0]}
                        alt={product.title}
                        className='min-w-[46px] min-h-[70px] object-contain rounded-md'
                        width={780}
                        height={1196}
                      />
                    </div>
                    <div className='flex flex-col justify-center gap-[0.5px]'>
                      <h3 className='text-[14px] font-medium truncate'>
                        {product.title}
                      </h3>
                      <span className='text-[11px] text-black/60 text-left'>
                        SKU: {product.id}
                      </span>
                    </div>
                  </Link>
                </td>
                <td>{product.maxPrice}</td>
                <td>{product.minPrice}</td>
                <td>{product.inventory}</td>
                <td className='min-h-20 flex justify-center items-center gap-2'>
                  <Link
                    href={`update-product/${product.slug}`}
                    className='px-2 md:px-3 py-1.5 bg-black text-white font-light rounded-md flex items-center gap-1'
                  >
                    <Pencil size={18} />
                    <span className='hidden md:block'>Edit</span>
                  </Link>
                  <button
                    className='p-1 border border-black/10 rounded-md'
                    onClick={() => handleDeleteProduct(product.slug)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className='mb-5 border-t border-t-black/10' />
      <div className='flex justify-between gap-1.5 md:gap-3 px-2 pb-5'>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className={`px-3 pr-4 text-sm font-medium border border-black/10 rounded-lg flex justify-center items-center gap-2 ${
            page === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'hover:bg-black/5'
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
              className={`px-4 py-2 rounded-lg transition hover:bg-black/5 ${
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
          className={`px-3 pl-4 text-sm font-medium border border-black/10 rounded-lg flex justify-center items-center gap-2 ${
            page === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
