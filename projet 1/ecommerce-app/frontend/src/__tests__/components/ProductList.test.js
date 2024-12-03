import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartContext } from '../../hooks/useCart';
import ProductList from '../../components/ProductList';
import { BrowserRouter } from 'react-router-dom';
import useProducts from '../../hooks/useProduct';

// Mock du hook useProducts
jest.mock('../../hooks/useProduct');

// Mock des icônes
jest.mock('react-icons/fa', () => ({
  FaShoppingCart: () => <div>Cart Icon</div>
}));

describe('ProductList', () => {
  beforeEach(() => {
    // Configuration par défaut du mock
    useProducts.mockReturnValue({
      products: [
        { _id: '1', name: 'Produit 1', price: 10, image: 'image1.jpg' }
      ],
      loading: false,
      error: null
    });
  });

  test('affiche la liste des produits', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ 
          addToCart: jest.fn(),
          cart: [],
          itemCount: 0,
          removeFromCart: jest.fn(),
          clearCart: jest.fn(),
          total: 0
        }}>
          <ProductList />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Produit 1')).toBeInTheDocument();
    expect(screen.getByText('10€')).toBeInTheDocument();
  });

  test('affiche le message de chargement', () => {
    // Modification du mock pour simuler le chargement
    useProducts.mockReturnValueOnce({
      products: [],
      loading: true,
      error: null
    });

    render(
      <BrowserRouter>
        <CartContext.Provider value={{ 
          addToCart: jest.fn(),
          cart: [],
          itemCount: 0,
          removeFromCart: jest.fn(),
          clearCart: jest.fn(),
          total: 0
        }}>
          <ProductList />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('affiche un message d\'erreur', () => {
    useProducts.mockReturnValueOnce({
      products: [],
      loading: false,
      error: 'Erreur de chargement'
    });

    render(
      <BrowserRouter>
        <CartContext.Provider value={{ 
          addToCart: jest.fn(),
          cart: [],
          itemCount: 0,
          removeFromCart: jest.fn(),
          clearCart: jest.fn(),
          total: 0
        }}>
          <ProductList />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Erreur:/)).toBeInTheDocument();
  });
});