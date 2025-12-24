"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from './AuthContext';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  vendor: string;
}

interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync with backend on login
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        try {
          const response = await api.get(`/cart/?user_id=${user.id}`);
          setCart(response.data);
        } catch (err) {
          console.error('Failed to fetch cart from backend', err);
        } finally {
          setLoading(false);
        }
      } else {
        setCart([]); // Clear on logout
      }
    };
    fetchCart();
  }, [isAuthenticated, user]);

  const addToCart = async (product: Product) => {
    if (!isAuthenticated || !user) {
      toast.error('Auth Required', { description: 'Please log in to add items.' });
      return;
    }

    try {
      const res = await api.post(`/cart/?user_id=${user.id}`, {
        product_id: product.id,
        quantity: 1
      });
      
      // Update local state by refetching or updating
      const updatedItem = res.data;
      setCart(prev => {
        const index = prev.findIndex(item => item.product.id === product.id);
        if (index > -1) {
          const newCart = [...prev];
          newCart[index] = updatedItem;
          return newCart;
        }
        return [...prev, updatedItem];
      });
      
      toast.success('Added to Cart', { description: `${product.title} has been added.` });
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return;
    try {
      await api.delete(`/cart/${productId}?user_id=${user.id}`);
      setCart(prev => prev.filter(item => item.product.id !== productId));
      toast.info('Removed from Cart');
    } catch (err) {
      toast.error('Failed to remove from cart');
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await api.delete(`/cart/?user_id=${user.id}`);
      setCart([]);
    } catch (err) {
      toast.error('Failed to clear cart');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
