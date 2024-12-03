// src/hooks/useCart.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './useAuth';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const cartItems = await api.getCart(user.id);
      setCart(cartItems);
      setTotal(calculateTotal(cartItems));
      setItemCount(updateItemCount(cartItems));
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du panier:', error);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const updateItemCount = (items) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = async (product, quantity) => {
    try {
      const response = await api.addToCart(product._id, quantity);
      if (response) {
        const updatedCart = [...cart, { product, quantity, _id: response._id }];
        setCart(updatedCart);
        setTotal(calculateTotal(updatedCart));
        setItemCount(updateItemCount(updatedCart));
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout au panier:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.removeFromCart(itemId);
      const updatedCart = cart.filter(item => item._id !== itemId);
      setCart(updatedCart);
      setTotal(calculateTotal(updatedCart));
      setItemCount(updateItemCount(updatedCart));
    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setItemCount(0);
  };

  return (
    <CartContext.Provider value={{ cart, total, itemCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};