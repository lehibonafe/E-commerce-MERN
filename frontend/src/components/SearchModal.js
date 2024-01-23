import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchModal = ({ show, onHide, onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({ minPrice: '', maxPrice: '', productName: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevSearchCriteria) => ({
      ...prevSearchCriteria,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Search Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMinPrice">
            <Form.Label>Minimum Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter minimum price"
              name="minPrice"
              value={searchCriteria.minPrice}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formMaxPrice">
            <Form.Label>Maximum Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter maximum price"
              name="maxPrice"
              value={searchCriteria.maxPrice}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={searchCriteria.productName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
