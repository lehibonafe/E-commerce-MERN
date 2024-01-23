import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShopOnline from "../images/shopping-online.png";

const Home = () => {
  return (
    <>
      <Container className="my-5 d-flex justify-content-center align-items-center">
        <Row className="my-4">
          {/* Left side with large text */}
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <h1 className="display-4">
              Elevate Your <span className="h1-pink">Style</span>, <br />
              Elevate Your <span className="h1-pink">Cart</span>. Shop Now!
            </h1>
          </Col>

          {/* Right side with large image */}
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={ShopOnline} className="w-100" />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <footer className="text-light">
          <p className="footer-text">
            <i className="bi bi-envelope-at-fill"></i>
            <a>bonafe.lehi@gmail.com</a>
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Home;
