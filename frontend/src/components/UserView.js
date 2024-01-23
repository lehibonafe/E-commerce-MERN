import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(productsData);

    const filteredProducts = Object.values(productsData)
      .filter(product => product.isActive)
      .map(product => (
        <ProductCard key={product._id} productProp={product} />
      ));

    setProducts(filteredProducts);
  }, [productsData]);

  return (
    <Container>
    <Row>
      {productsData.map((product) => (
        <Col key={product._id} xs={12} sm={6} md={4}>
          <ProductCard productProp={product} />
        </Col>
      ))}
    </Row>
  </Container>
  );
}
