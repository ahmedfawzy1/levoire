'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getBrands } from '@/app/lib/brands';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands(page, limit);
      setBrands(brands.brands);
      setTotalPages(brands.totalPages);
    };
    fetchBrands();
  }, [limit, page]);

  if (!brands.length) {
    return <div>No brands found.</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleDeleteBrand = async (id: number) => {
    try {
      const response = await axios.delete(`/api/brands/${id}`);

      if (response.status === 200) {
        window.location.reload();

        toast.success('Brand deleted successfully');
      } else {
        console.error('Failed to delete brand');
        toast.error('Failed to delete brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  return (
    <div className='relative px-1 md:px-3'>
      <div className='overflow-x-auto h-screen'>
        <table className='w-full table-auto text-sm font-semibold overflow-x-auto'>
          <thead className='text-[10px] md:text-xs text-black/80 uppercase bg-gray-50 border-b border-b-black/10'>
            <tr className='md:truncate'>
              <th className='py-3'>Id</th>
              <th className='py-3'>Image</th>
              <th className='py-3'>Name</th>
              <th className='py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: any) => (
              <tr
                key={brand.id}
                className='text-center border-b border-b-black/10 last:border-0'
              >
                <td>{brand.id}</td>
                <td className='w-14 py-2'>
                  <div className='max-w-[46px] max-h-[70px] bg-[#FAFAFC] rounded-lg'>
                    <Image
                      src={(brand.image as string[])[0]}
                      alt={brand.name}
                      className='min-w-[46px] min-h-[50px] object-contain rounded-md'
                      width={70}
                      height={12}
                    />
                  </div>
                </td>
                <td className='text-[14px] font-medium max-w-28 truncate'>
                  {brand.name}
                </td>
                <td className='min-h-20 flex justify-center items-center gap-2'>
                  <Link
                    href={`/admin-panel/brands/${brand.id}`}
                    className='px-2 md:px-3 py-1.5 bg-black text-white font-light rounded-md flex items-center gap-1'
                  >
                    <Pencil size={18} />
                    <span className='hidden md:block'>Edit</span>
                  </Link>
                  <button
                    className='p-1 border border-black/10 rounded-md'
                    onClick={() => handleDeleteBrand(brand.id)}
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
