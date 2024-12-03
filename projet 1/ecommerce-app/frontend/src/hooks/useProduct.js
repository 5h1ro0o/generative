import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('📦 Récupération des produits...');
        
        const data = await api.getProducts();
        console.log('✅ Produits reçus:', data);
        
        if (!data || !Array.isArray(data)) {
          console.error('❌ Format de données invalide:', data);
          throw new Error('Format de données invalide');
        }
        
        setProducts(data);
      } catch (error) {
        console.error('❌ Erreur lors de la récupération:', error);
        setError(error.message || 'Une erreur est survenue');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;