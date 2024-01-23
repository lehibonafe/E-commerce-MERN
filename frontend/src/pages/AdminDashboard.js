// AdminView.js

import React, { useState } from "react";
import Products from "../components/Products";
import AddProduct from "../components/AddProduct";

const AdminView = () => {
  const [productList, setProductList] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProductList((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      <h1 className="text-center mt-4">Admin Dashboard</h1>
      <AddProduct onAddProduct={handleAddProduct} />
      <Products products={productList} />
    </div>
  );
};

export default AdminView;
