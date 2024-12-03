// src/__tests__/pages/Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { CartProvider } from '../../hooks/useCart';
import { AuthProvider } from '../../hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../components/ProductList', () => {
  return function MockProductList() {
    return <div data-testid="product-list">ProductList</div>;
  };
});

jest.mock('../../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe('Home', () => {
  test('affiche la bannière', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Bienvenue sur notre boutique/i)).toBeInTheDocument();
  });

  test('affiche la liste des produits', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  test('affiche le footer', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});