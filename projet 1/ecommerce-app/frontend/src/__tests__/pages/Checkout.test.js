// src/__tests__/pages/Checkout.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from '../../pages/Checkout';
import { CartContext } from '../../hooks/useCart';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Checkout', () => {
  const mockCart = [
    {
      _id: '1',
      product: { name: 'Produit Test', price: 99.99 },
      quantity: 1
    }
  ];

  test('affiche le récapitulatif de commande', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ cart: mockCart, total: 99.99, clearCart: jest.fn() }}>
          <Checkout />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Récapitulatif de la commande/i)).toBeInTheDocument();
    expect(screen.getByText(/Produit Test/i)).toBeInTheDocument();
    expect(screen.getAllByText(/99.99€/i).length).toBeGreaterThan(0);
  });

  test('permet de choisir un moyen de paiement', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ cart: mockCart, total: 99.99, clearCart: jest.fn() }}>
          <Checkout />
        </CartContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText(/PayPal/i));
    expect(screen.getByRole('button', { name: /Passer la commande/i })).not.toBeDisabled();
  });
});