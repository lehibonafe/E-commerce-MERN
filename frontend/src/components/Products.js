// Products.js

import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Products = ({ products }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.availability ? "Available" : "Not Available"}</td>
            <td>
              <Button variant="primary" size="sm">
                Edit
              </Button>{" "}
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Products;
