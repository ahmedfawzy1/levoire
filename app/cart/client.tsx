'use client';

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { setCartItems, cartItems } = useContext(CartContext);
  const { user } = useAuth();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrementQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDecrementQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = cartItems.filter(
      (item, itemIndex) => itemIndex !== index,
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success('Item removed from your cart');
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.maxPrice * item.quantity,
    0,
  );
  const discount = 0;
  const shippingFee = 0;
  const total = subtotal + shippingFee - discount;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please signIn to Checkout');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/checkout', {
        cartItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.maxPrice,
        })),
        userId: Number(user?.id),
      });

      window.location = response.data.url;
    } catch (error) {
      console.error(`Error creating checkout ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-5 py-10 min-h-[calc(100vh-160px)]'>
      <h1 className='text-4xl font-extrabold font-integralCF mb-8'>
        Your Cart
      </h1>
      <div className='flex flex-row flex-wrap md:flex-nowrap justify-center md:justify-between items-start gap-6'>
        <div
          className={`flex flex-col basis-full md:basis-8/12 justify-between gap-5 rounded-2xl ${
            cartItems.length ? 'border border-black/10 p-4' : ''
          }`}
        >
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`w-full flex flex-row justify-between border-b border-black/10 pb-5 last:border-b-0 last:pb-0`}
            >
              <div className='flex items-center gap-4'>
                <div className='w-[100px] h-[100px] bg-[#F0EEED] flex justify-center items-center rounded-xl overflow-hidden'>
                  <Image
                    src={item.image[0]}
                    alt={item.slug}
                    width={96}
                    height={147}
                  />
                </div>
                <div>
                  <h1 className='md:text-xl font-bold'>{item.title}</h1>
                  <p className='text-sm'>
                    Sizes: <span className='text-black/60'>{item.size}</span>
                  </p>
                  <p className='text-sm'>
                    Color: <span className='text-black/60'>{item.color}</span>
                  </p>
                  <p className='text-xl font-extrabold mt-3'>
                    ${item.maxPrice}
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <button onClick={() => handleRemoveFromCart(index)}>
                  <Image
                    src={'/images/icons/trash.svg'}
                    alt='trash'
                    width={24}
                    height={24}
                  />
                </button>
                <div className='px-4 py-[2px] bg-[#F0F0F0] rounded-3xl flex flex-row items-center gap-5 md:gap-8'>
                  <button
                    onClick={() => handleDecrementQuantity(index)}
                    className='text-2xl md:text-3xl'
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => handleIncrementQuantity(index)}
                    className='text-2xl md:text-3xl'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col basis-full md:basis-4/12 justify-between gap-5 border border-black/10 rounded-2xl p-4'>
          <div>
            <h3 className='text-xl font-bold mb-3'>Order Summary</h3>
            <div className='flex justify-between'>
              <p className='md:text-lg text-black/40'>Subtotal</p>
              <span className='text-xl font-semibold'>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <p className='md:text-lg text-black/40'>Discount</p>
              <span className='text-xl font-semibold text-[#ff3333]'>
                ${discount}
              </span>
            </div>
            <div className='flex justify-between'>
              <p className='md:text-lg text-black/40'>Delivery Fee</p>
              <span className='text-xl font-semibold'>${shippingFee}</span>
            </div>
          </div>
          <hr className='text-black/20' />
          <div>
            <div className='flex justify-between mb-4'>
              <p className='md:text-lg text-black/40'>Total</p>
              <span className='text-xl font-bold'>${total.toFixed(2)}</span>
            </div>
            <button
              disabled={cartItems.length === 0 || loading}
              onClick={handleCheckout}
              className='w-full bg-black text-white font-light py-3 rounded-3xl flex justify-center gap-3'
            >
              {loading ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                <>
                  Go to Checkout
                  <ArrowRight color='#fff' />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
