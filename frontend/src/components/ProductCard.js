import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;
  const [image, setImage] = useState("");

  useEffect(() => {
    // Fetch random character from the API
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        // Get a random index within the range of the array
        const randomIndex = Math.floor(Math.random() * data.results.length);

        // Extract image URL from the fetched data using the random index
        const randomCharacter = data.results[randomIndex];

        if (randomCharacter && randomCharacter.image) {
          setImage(randomCharacter.image);
        }
      })
      .catch((error) => {
        console.error("Error fetching random character:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <Col xs={12} sm={6} md={12} className="mt-5">
      <MDBCard className="bg-shadow">
        <MDBCardImage src={image} position="top" alt="Random Character" />
        <MDBCardBody>
          <Card.Title className="text-center text-primary">{name}</Card.Title>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text className="text-danger">₱ {price}</Card.Text>
          <Link
            to={`/products/${_id}`}
            className="d-flex justify-content-center"
          >
            <Button className="w-100">Details</Button>
          </Link>
        </MDBCardBody>
      </MDBCard>
    </Col>
  );
}
