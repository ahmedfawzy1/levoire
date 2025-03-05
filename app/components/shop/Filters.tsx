'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import ProductContext from '@/app/context/ProductContext';
import {
  Check,
  ChevronRight,
  ChevronUp,
  SlidersVertical,
  X,
} from 'lucide-react';

interface Product {
  category: string;
  size: string;
  color: string;
  style: string;
  maxPrice: number;
  minPrice: number;
}

interface filterProps {
  showFilter: boolean;
  setShowFilter: (showFilter: boolean) => void;
}

export default function Filters({ showFilter, setShowFilter }: filterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setProducts, allProducts } = useContext(ProductContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState({
    min: 100,
    max: 300,
  });
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isStyleOpen, setIsStyleOpen] = useState(true);

  const categories = [
    'Dresses',
    'Outerwear',
    'Bottomwear',
    'Knitwear',
    'T-Shirts',
    'Shirts',
    'Tops',
  ];

  const colors = [
    '#fe345e',
    '#5b2c2c',
    '#8a2525',
    '#a94b4b',
    '#9f8383',
    '#733131',
  ];

  const sizes = ['sm', 'md', 'xl', '2xl', '3xl', '4xl'];

  const dressStyles = [
    'Casual',
    'Formal',
    'Party',
    'Gym',
    'Shirts',
    'Tops',
    'Boho',
  ];

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }
    if (selectedColor.length > 0) {
      params.set('color', selectedColor.join(','));
    }
    if (selectedSize.length > 0) {
      params.set('size', selectedSize.join(','));
    }
    if (selectedStyle.length > 0) {
      params.set('style', selectedStyle.join(','));
    }
    if (price.min !== 100 || price.max !== 300) {
      params.set('minPrice', price.min.toString());
      params.set('maxPrice', price.max.toString());
    }

    router.push(`?${params.toString()}`, undefined);
  }, [
    router,
    selectedCategories,
    selectedColor,
    selectedSize,
    selectedStyle,
    price,
  ]);

  const filterProducts = useCallback(() => {
    const filtered = allProducts.filter((product: Product) => {
      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedStyle.length === 0 || selectedStyle.includes(product.style)) &&
        (selectedSize.length === 0 ||
          selectedSize.some(size => product.size.split(',').includes(size))) &&
        (selectedColor.length === 0 ||
          selectedColor.some(color =>
            product.color.split(',').includes(color)
          )) &&
        product.maxPrice >= price.min &&
        product.maxPrice <= price.max
      );
    });
    setProducts(filtered);
  }, [
    allProducts,
    selectedCategories,
    selectedColor,
    selectedSize,
    selectedStyle,
    price,
    setProducts,
  ]);

  const filtersFromUrl = useCallback(() => {
    const categories = searchParams.get('category')?.split(',') || [];
    const colors = searchParams.get('color')?.split(',') || [];
    const sizes = searchParams.get('size')?.split(',') || [];
    const styles = searchParams.get('style')?.split(',') || [];
    const minPrice = parseFloat(searchParams.get('minPrice') || '100');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '300');

    setSelectedCategories(categories);
    setSelectedColor(colors);
    setSelectedSize(sizes);
    setSelectedStyle(styles);
    setPrice({ min: minPrice, max: maxPrice });
  }, [searchParams]);

  const handleToggleCategory = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelected);
  };

  const handleToggleColor = (color: string) => {
    const newSelected = selectedColor.includes(color)
      ? selectedColor.filter(c => c !== color)
      : [...selectedColor, color];
    setSelectedColor(newSelected);
  };

  const handleToggleSize = (size: string) => {
    const newSelected = selectedSize.includes(size)
      ? selectedSize.filter(s => s !== size)
      : [...selectedSize, size];
    setSelectedSize(newSelected);
  };

  const handleToggleStyle = (styleItem: string) => {
    const newSelected = selectedStyle.includes(styleItem)
      ? selectedStyle.filter(s => s !== styleItem)
      : [...selectedStyle, styleItem];
    setSelectedStyle(newSelected);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setPrice({ min: 100, max });
    updateUrlParams();
    filterProducts();
  };

  useEffect(() => {
    filtersFromUrl();
  }, [filtersFromUrl]);

  useEffect(() => {
    filterProducts();
    updateUrlParams();
  }, [filterProducts, updateUrlParams]);

  return (
    <div
      className={`md:w-full md:max-w-full md:h-full bg-white md:px-4 md:py-3 border border-black/10 rounded-2xl md:flex flex-col transition-all duration-500 overflow-auto scrollbar-hide ${
        showFilter ? 'w-full h-full min-w-72 px-4 py-3' : 'w-0 h-0 min-w-0'
      }`}
    >
      <div className='w-full md:hidden flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold'>Filters</h3>
        <X
          color='#00000066'
          size={18}
          onClick={() => setShowFilter(!showFilter)}
          className='cursor-pointer'
        />
      </div>
      <div className='w-full'>
        <div className='w-full hidden md:flex justify-between items-center'>
          <h3 className='text-md font-bold'>Filters</h3>
          <SlidersVertical color='#00000066' size={18} />
        </div>
        <hr className='w-full hidden md:block my-4 border border-black/10' />
        <div className='w-full flex flex-col justify-between items-start gap-2'>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className='w-full flex justify-between items-center'
          >
            <h3 className='text-md font-bold'>Categories</h3>
            <ChevronUp
              size={18}
              className={`transition-transform ${
                isCategoryOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`w-full overflow-hidden transition-max-height duration-300 ease-in-out ${
              isCategoryOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            {categories?.map((category: string, index: number) => {
              const isActive = selectedCategories.includes(category);
              return (
                <button
                  key={index}
                  onClick={() => handleToggleCategory(category)}
                  className={`w-full text-black/60 flex justify-between items-center ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {category}
                  <ChevronRight color='#00000099' size={19} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <hr className='w-full my-4 border border-black/10' />
      <div className='w-full'>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className='w-full flex justify-between items-center mb-4'
        >
          <h3 className='text-md font-bold'>Price</h3>
          <ChevronUp
            size={18}
            className={`transition-transform ${
              isPriceOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isPriceOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <label htmlFor='price' className='sr-only'>
            Price
          </label>
          <input
            className='w-full h-3 bg-black accent-gray-200 rounded-lg appearance-none cursor-pointer'
            type='range'
            name='price'
            id='price'
            min={100}
            max={300}
            value={price.max}
            onChange={handlePriceChange}
          />
          <div className='text-right text-sm'>
            <span>${price.max}</span>
          </div>
        </div>
      </div>
      <hr className='w-full my-4 border border-black/10' />
      <div className='w-full'>
        <button
          onClick={() => setIsColorOpen(!isColorOpen)}
          className='w-full flex justify-between items-center mb-4'
        >
          <h3 className='text-md font-bold'>Colors</h3>
          <ChevronUp
            size={18}
            className={`transition-transform ${
              isColorOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isColorOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className='flex flex-wrap'>
            {colors?.map((color: string, index: number) => {
              const isActive = selectedColor.includes(color);
              return (
                <button
                  onClick={() => handleToggleColor(color)}
                  key={index}
                  className={`relative w-[35px] h-[35px] m-1 rounded-full flex justify-center items-center transition`}
                  style={{
                    backgroundColor: color,
                  }}
                  aria-label='color'
                >
                  {isActive ? <Check size={18} color='#fff' /> : ''}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <hr className='w-full my-4 border border-black/10' />
      <div className='w-full'>
        <button
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className='w-full flex justify-between items-center mb-4'
        >
          <h3 className='text-md font-bold'>Size</h3>
          <ChevronUp
            size={18}
            className={`transition-transform ${isSizeOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isSizeOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className='flex flex-wrap items-center gap-2'>
            {sizes?.map((size: string, index: number) => {
              const isActive = selectedSize.includes(size);
              return (
                <button
                  onClick={() => handleToggleSize(size)}
                  key={index}
                  className={`w-12 px-3 py-1 text-center text-sm text-black/60 rounded-3xl cursor-pointer bg-[#efefef] ${
                    isActive ? 'bg-black text-white' : ''
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <hr className='w-full my-4 border border-black/10' />
      <div className='w-full'>
        <button
          onClick={() => setIsStyleOpen(!isStyleOpen)}
          className='w-full flex justify-between items-center mb-4'
        >
          <h3 className='text-md font-bold'>Dress Style</h3>
          <ChevronUp
            size={18}
            className={`transition-transform ${
              isStyleOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isStyleOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className='w-full flex flex-col justify-between items-start gap-2 text-black/60'>
            {dressStyles?.map((styleItem: string, index: number) => {
              const isActive = selectedStyle.includes(styleItem);
              return (
                <button
                  key={index}
                  onClick={() => handleToggleStyle(styleItem)}
                  className={`w-full flex justify-between items-center ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {styleItem}
                  <ChevronRight color='#00000099' size={19} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
