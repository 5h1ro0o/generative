// src/__tests__/hooks/useProduct.test.js
import { renderHook, act } from '@testing-library/react';
import useProducts from '../../hooks/useProduct';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('useProduct', () => {
  const mockProducts = [
    { _id: '1', name: 'Produit 1', price: 99.99 },
    { _id: '2', name: 'Produit 2', price: 149.99 }
  ];

  beforeEach(() => {
    api.getProducts.mockReset();
  });

  test('charge les produits avec succès', async () => {
    api.getProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  test('gère les erreurs de chargement', async () => {
    const error = new Error('Erreur de chargement');
    api.getProducts.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(error.message);
  });
});