import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../hooks/useCart';
import { AuthContext } from '../hooks/useAuth';

export const renderWithProviders = (
  ui,
  {
    cartValue = { 
      itemCount: 0,
      cart: [],
      total: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn()
    },
    authValue = {
      user: null,
      loading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn()
    }
  } = {}
) => {
  const AllTheProviders = ({ children }) => (
    <MemoryRouter>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: AllTheProviders });
};