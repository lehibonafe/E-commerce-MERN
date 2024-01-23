import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';

export default function ProductView() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
  };
  
  const buyProduct = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.existingProduct && data.existingProduct.productId !== undefined) {
        // Product is already in the cart, show error modal
        Swal.fire({
          title: 'Product Already in Cart',
          icon: 'error',
          text: 'This product is already in your cart.',
        });
      } else if (data === 'Action Forbidden') {
        Swal.fire({
          title: 'Admin Cart Error',
          icon: 'error',
          text: 'Admin is not allowed to add to cart.',
        });
      } else {
        Swal.fire({
          title: 'Successfully Added to Cart',
          icon: 'success',
          text: 'You have successfully added this product to your cart.',
        }).then(() => {
          // Redirect to the product page
          navigate(`/b4/products`);
        });
      }
    });
  };
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setName(data.products.name);
      setDescription(data.products.description);
      setPrice(data.products.price);
      setQuantity(data.products.quantity > 0 ? data.products.quantity : 1);
    });
  }, [productId]);

  useEffect(() => {
    // Fetch random character from the API
    fetch('https://rickandmortyapi.com/api/character')
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
        console.error('Error fetching random character:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  
  return (
    <Container className="mt-5">
    <Row>
    <Col lg={{ span: 6, offset: 3 }}>
    <Card>
    <MDBCardImage src={image} position='top' alt='Random Character'/>

    <MDBCardBody>
    <Card.Title className='text-primary text-center'>{name}</Card.Title>
    <Card.Subtitle>Description:</Card.Subtitle>
    <Card.Text>{description}</Card.Text>
    <Card.Subtitle>Price:</Card.Subtitle>
    <Card.Text className='text-danger'>PhP {price}</Card.Text>
    <Card.Subtitle className='text-center'>Quantity:</Card.Subtitle>
    <Card.Text>
    <InputGroup className='w-50 d-flex mx-auto'>
    <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
    <FormControl 
    aria-label="Quantity"
    value={quantity}
    onChange={handleInputChange}
    className='text-center'
    />
    <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
    </InputGroup>
    </Card.Text>
  
    {user.id !== null ? (

      <Button className='d-flex mx-auto' variant="primary" block onClick={() => buyProduct(productId)}>
      Add to Cart
      </Button>

      ) : (
        <Link className="btn btn-danger btn-block" to="/b4/login">
        Log in to Buy
        </Link>
        )}
        </MDBCardBody>
        </Card>
        </Col>
        </Row>
        </Container>
        );
}
