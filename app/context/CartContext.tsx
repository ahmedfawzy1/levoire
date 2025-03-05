'use client';

import { useState, useMemo, createContext } from 'react';

type CartContextType = {
  cartItems: any[];
  setCartItems: (cartItems: any[]) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

interface CartProviderType {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderType) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
