import React, { createContext, useContext, useState } from 'react';

// Definimos la estructura de un producto en el carrito
export interface Product {
  id: string | number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        // Si ya existe, aumentamos la cantidad
        const newCart = [...prevCart];
        newCart[existingIndex].cantidad += 1;
        return newCart;
      } else {
        // Si es nuevo, lo agregamos con cantidad 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}