// src/__tests__/hooks/useCart.test.js
import { renderHook, act } from '@testing-library/react';
import { useCart, CartProvider } from '../../hooks/useCart';
import { AuthProvider } from '../../hooks/useAuth';
import api from '../../utils/api';

// Mock de l'API
jest.mock('../../utils/api');

const wrapper = ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);

describe('useCart', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  test('addToCart ajoute un produit au panier', async () => {
    // Mock de la réponse de l'API
    const mockProduct = { _id: '1', name: 'Test', price: 10 };
    const mockResponse = { _id: 'cart_item_1', product: mockProduct, quantity: 1 };
    api.addToCart.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart(mockProduct, 1);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.itemCount).toBe(1);
    expect(api.addToCart).toHaveBeenCalledWith('1', 1);
  });

  test('removeFromCart supprime un produit du panier', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    api.removeFromCart.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.removeFromCart('1');
    });

    expect(result.current.cart.length).toBe(0);
    expect(result.current.itemCount).toBe(0);
    expect(api.removeFromCart).toHaveBeenCalledWith('1');
  });
});