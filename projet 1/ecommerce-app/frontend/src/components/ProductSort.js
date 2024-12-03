// src/components/ProductSort.js
import React from 'react';

const ProductSort = ({ onSortChange }) => {
  return (
    <div className="sort-container">
      <select 
        className="sort-select"
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Trier par...</option>
        <option value="name-asc">Nom (A-Z)</option>
        <option value="name-desc">Nom (Z-A)</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
      </select>
    </div>
  );
};

export default ProductSort;