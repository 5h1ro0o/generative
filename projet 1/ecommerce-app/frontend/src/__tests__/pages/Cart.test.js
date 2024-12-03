// frontend/src/__tests__/pages/Cart.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../hooks/useCart';
import Cart from '../../pages/Cart';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

test('affiche le panier vide', () => {
  render(
    <BrowserRouter>
      <CartContext.Provider value={{ cart: [], total: 0 }}>
        <Cart />
      </CartContext.Provider>
    </BrowserRouter>
  );
  
  expect(screen.getByText('Mon Panier')).toBeInTheDocument();
});