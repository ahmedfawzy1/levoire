'use client';

import { useState, useEffect, useMemo, createContext } from 'react';
import { getProducts } from '../lib/product';

type ProductContextType = {
  allProducts: any[];
  setAllProducts: (value: any[]) => void;
  products: any[];
  setProducts: (value: any[]) => void;
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
  setTotalPages: (value: number) => void;
  limit: number;
};

const ProductContext = createContext<ProductContextType>({
  allProducts: [],
  setAllProducts: () => {},
  products: [],
  setProducts: () => {},
  page: 1,
  setPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  limit: 10,
});

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchedProducts = async () => {
      try {
        const data = await getProducts(page, limit, signal);
        setProducts(data.data || []);
        setAllProducts(data.data || []);
        setTotalPages(data.totalPage || 1);
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching products', error);
        }
      }
    };

    fetchedProducts();

    return () => {
      controller.abort();
    };
  }, [page, limit]);

  const contextValue = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      products,
      setProducts,
      page,
      setPage,
      totalPages,
      setTotalPages,
      limit,
    }),
    [allProducts, setAllProducts, products, page, totalPages, limit]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
