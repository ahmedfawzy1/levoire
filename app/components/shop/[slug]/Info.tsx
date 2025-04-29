'use client';

import { useState, useContext } from 'react';
import CartContext from '@/app/context/CartContext';
import ReactStars from 'react-rating-star-with-type';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

interface InfoProps {
  id: number;
  title: string;
  description: string;
  maxPrice: number;
  minPrice: number;
  color: string;
  size: string;
  userId: number;
  store: string;
  image: string;
  rating: number;
  slug: string;
}

export default function Info({
  id,
  title,
  description,
  maxPrice,
  minPrice,
  color,
  size,
  store,
  image,
  slug,
  rating,
  userId,
}: InfoProps) {
  const [quantity, setQuantity] = useState(1);
  const colors = color.split(',');
  const sizes = size.split(',');
  const [selectedSize, setSelectedSize] = useState(
    sizes.length === 1 ? sizes[0] : '',
  );
  const [selectedColor, setSelectedColor] = useState(
    colors.length === 1 ? colors[0] : '',
  );
  const { setCartItems } = useContext(CartContext);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast('Make it yours! Choose a size and color', {
        icon: '🔥',
      });
      return;
    }

    const cartItem = {
      id,
      title,
      description,
      maxPrice,
      minPrice,
      color: selectedColor,
      size: selectedSize,
      store,
      image,
      userId,
      slug,
      quantity,
    };

    // Check if the cart data is already present in localStorage
    const cartData = localStorage.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : [];

    // Find if the product already exists in the cart with the same id and size and color
    const existingProductIndex = cart.findIndex(
      (item: { id: number; size: string; color: string }) =>
        item.id === id &&
        item.size === selectedSize &&
        item.color === selectedColor,
    );

    if (existingProductIndex > -1) {
      // If the product exists, increase the quantity
      cart[existingProductIndex].quantity = quantity;
    } else {
      // If the product does not exist, add it to the cart array
      cart.push(cartItem);
    }

    // Update localStorage with new cart array
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);

    // Reset selected size and color
    setSelectedSize(sizes.length === 1 ? sizes[0] : '');
    setSelectedColor(colors.length === 1 ? colors[0] : '');

    toast.success('Product added to cart successfully!');
  };

  const handleIncrementQuantity = () => setQuantity(prev => prev + 1);
  const handleDecrementQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className='relative basis-1/2'>
      <h1 className='text-4xl font-extrabold'>{title}</h1>
      <div className='flex gap-3 my-2.5'>
        <ReactStars
          value={rating}
          isEdit={false}
          activeColors={['red', 'orange', '#FFCE00', '#9177FF', '#FFC633']}
        />
        <p className='text-sm'>
          {rating}
          <span className='text-black/60'>/5</span>
        </p>
      </div>
      <div className='flex gap-2'>
        <p className='text-xl font-bold'>${maxPrice}</p>
        {minPrice > 0 && (
          <p className='text-[#000000a6] text-lg font-bold line-through'>
            ${minPrice}
          </p>
        )}
        {minPrice > 0 && (
          <div className='w-fit h-fit bg-red-200 rounded-3xl py-1 px-2 text-[0.75rem] text-red-800'>
            -{Math.round((1 - minPrice / maxPrice) * 100)}%
          </div>
        )}
      </div>
      <p className='text-black/60 my-2.5'>
        {description.replace(/<\/?[^>]+(>|$)/g, '')}
      </p>
      <hr className='bg-black/10 my-4' />
      <div className='my-4'>
        <h2 className='text-sm font-medium text-black/60 mb-2'>
          Select Colors
        </h2>
        <div className='flex'>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`relative w-[35px] h-[35px] m-1 rounded-full flex justify-center items-center transition`}
              style={{
                backgroundColor: color,
              }}
            >
              {selectedColor === color ? <Check size={18} color='#fff' /> : ''}
            </div>
          ))}
        </div>
      </div>
      <hr className='bg-black/10 my-4' />
      <div>
        <h3 className='text-sm font-medium text-black/60 mb-2'>Choose Size</h3>
        <ul className='flex gap-4'>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 rounded-3xl cursor-pointer text-center transition ${
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-[#F0F0F0] text-black/60'
              }`}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <hr className='bg-black/10 my-4' />

      <div className='flex items-center gap-4 my-4'>
        <div className='px-4 py-1 bg-[#F0F0F0] rounded-3xl flex flex-row items-center gap-8'>
          <button onClick={handleDecrementQuantity} className='text-3xl'>
            -
          </button>
          <p>{quantity}</p>
          <button onClick={handleIncrementQuantity} className='text-3xl'>
            +
          </button>
        </div>
        <div className='w-full'>
          <button
            onClick={handleAddToCart}
            className='w-full bg-black text-white py-2.5 rounded-3xl'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
