// ProductSearch.js

import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [productName, setProductName] = useState('');

  const handleSearch = () => {
    // Trigger the onSearch callback with the search criteria
    onSearch({
      minPrice: parseFloat(minPrice) || '',
      maxPrice: parseFloat(maxPrice) || '',
      productName,
    });
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div>
        <label>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProductSearch;
