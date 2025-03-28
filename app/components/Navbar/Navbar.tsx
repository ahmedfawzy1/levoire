'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { menuItems } from '@/lib/constants';
import {
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  SearchIcon,
  Settings,
  ShoppingCart,
  UserCircle,
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, handleSignOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const buttonClickedRef = useRef(false);

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    buttonClickedRef.current = true;
    setIsMenuOpen(prevState => {
      if (!prevState) setIsUserMenuOpen(false);
      return !prevState;
    });
  };

  const toggleUserMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    buttonClickedRef.current = true;
    setIsUserMenuOpen(prevState => {
      if (!prevState) setIsMenuOpen(false);
      return !prevState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonClickedRef.current) {
        buttonClickedRef.current = false;
        return;
      }

      const target = event.target as Node;
      const isMenuButton = menuRef.current?.contains(target);
      const isUserMenuButton = userMenuRef.current?.contains(target);

      if (!isMenuButton && !isUserMenuButton) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-white border-gray-200 sticky top-0 inset-x-0 z-50 shadow-sm'>
      <div
        className='px-5 w-full h-16 max-w-[1500px] flex md:flex-wrap items-center justify-between gap-9 relative mx-auto border-b-1 border-black/10'
        ref={menuRef}
      >
        <div className='text-2xl font-extrabold leading-3 flex items-center gap-2.5'>
          <button
            type='button'
            className='text-sm text-gray-500 rounded-lg md:hidden'
            aria-label='navbar-user'
            aria-expanded={isMenuOpen}
            onClick={toggleMobileMenu}
          >
            <Menu color='#000000' strokeWidth={2.3} />
          </button>
          <Link href='/' className='text-3xl font-extrabold'>
            <Image src='/images/logo.png' alt='logo' width={98} height={28} />
          </Link>
        </div>

        <div className={`hidden md:flex items-center justify-between}`}>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white'>
            {menuItems
              .filter(item => user || item.label !== 'My Orders')
              .map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Link
                    className='text-black text-[15px]'
                    href={item.url}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className='hidden md:flex flex-1 relative'>
          <span className='absolute top-2.5 left-3'>
            <SearchIcon className='text-black/40' size={17} />
          </span>
          <input
            className='block w-full py-2 ps-9 bg-[#F0F0F0] text-sm text-gray-900 rounded-3xl'
            placeholder='Search for products...'
            type='search'
          />
        </div>
        <div className='flex items-center gap-3'>
          <Search
            className='cursor-pointer block md:hidden'
            size={20}
            aria-label='open Search'
          />
          <Link
            className='text-black cursor-pointer'
            href='/wishlist'
            aria-label='go to wishlist'
          >
            <Heart size={20} />
            <span className='sr-only'>wishlist</span>
          </Link>
          <Link
            className='text-black cursor-pointer'
            href='/cart'
            aria-label='go to cart'
          >
            <ShoppingCart size={20} />
          </Link>
          <button
            type='button'
            className='flex text-sm rounded-full md:me-0'
            id='user-menu-button'
            aria-expanded={isUserMenuOpen}
            onClick={toggleUserMenu}
          >
            <UserCircle
              className='cursor-pointer'
              size={20}
              aria-label='go to register'
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`w-full md:flex items-center justify-between absolute transition duration-300 ${
          isMenuOpen
            ? 'max-h-screen opacity-100 scale-100'
            : 'max-h-0 opacity-0 scale-95 pointer-events-none'
        }`}
        ref={menuRef}
      >
        <ul className='flex flex-col font-medium p-4 md:p-0 border border-gray-100 rounded-b-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white'>
          {menuItems
            .filter(item => user || item.label !== 'My Orders')
            .map((item, index) => (
              <li key={`${item}-${index}`} className='pb-1.5'>
                <Link
                  className='text-black text-[15px]'
                  href={item.url}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div
        className={`p-2 rounded-xl absolute right-4 z-50 text-base bg-white divide-y divide-gray-100 shadow-sm transition ${
          isUserMenuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        ref={userMenuRef}
      >
        <div className='p-1'>
          {user ? (
            <>
              <span className='block text-sm font-semibold text-gray-700'>
                {user?.username || user?.name}
              </span>
              <span className='block text-sm  text-gray-500 truncate'>
                {user?.email}
              </span>
            </>
          ) : (
            <div className='min-w-48 flex flex-col gap-2 text-center'>
              <Link
                className='w-full bg-black text-white py-2 rounded-lg transition duration-300 hover:bg-gray-600'
                href='/sign-in'
                onClick={() => setIsUserMenuOpen(false)}
              >
                login
              </Link>
              <Link
                className='w-full bg-white text-black py-2 rounded-lg border border-black'
                href='/sign-up'
                onClick={() => setIsUserMenuOpen(false)}
              >
                register
              </Link>
            </div>
          )}
        </div>
        {user && (
          <ul className='py-3' aria-labelledby='user-menu-button'>
            {user?.role === 1 ? (
              <li key='dashboard' className='px-0 mb-2 gap-2'>
                <Link
                  href='/admin-panel/orders'
                  className='w-full ps-3 py-2 rounded-lg flex items-center gap-2'
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings size={16} />
                  Dashboard
                </Link>
              </li>
            ) : null}
            <li key='orders' className='px-0 mb-2 gap-2'>
              <Link
                href='/orders'
                className='w-full ps-3 py-2 rounded-lg flex items-center gap-2'
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Package size={16} />
                Orders
              </Link>
            </li>
            <li className='p-0' key='logging'>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsUserMenuOpen(false);
                }}
                className='w-full bg-red-400 text-white py-1.5 rounded-lg flex justify-center items-center gap-1.5'
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
