// src/components/ProductList.js
import React, { useContext, useState, useMemo } from 'react';
import { CartContext } from '../hooks/useCart';
import useProducts from '../hooks/useProduct';
import ProductSort from './ProductSort';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useContext(CartContext);
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const productsCopy = [...products];
    
    switch (sortOption) {
      case 'name-asc':
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [products, sortOption]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="products-container">
      <ProductSort onSortChange={setSortOption} />
      <div className="products-grid">
        {sortedProducts && sortedProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.name}</h2>
              <p className="product-price">{product.price}€</p>
              <button 
                className="add-to-cart" 
                onClick={() => addToCart(product, 1)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; // Ajout de l'export par défaut