import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import Brand from "../images/brand.svg";

export default function AppNavbar() {
  const { user, unsetUser } = useContext(UserContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the logout logic here
        // For example, redirecting to the logout route
        unsetUser();
        window.location.href = "/b4/login";
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      className="text-lg-center d-flex justify-content-center align-items-center text-white"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
          <img style={{ width: "100px" }} src={Brand} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              HOME
            </Nav.Link>
            <span className="divider mx-2 d-none d-lg-flex justify-content-center align-items-center">
              |
            </span>
            <Nav.Link as={NavLink} to="/b4/products">
              SHOP <i className="bi bi-shop mx-1"></i>
            </Nav.Link>
            {user.id !== null && user.isAdmin === true && (
              <>
                <span className="divider mx-2 d-none d-lg-flex justify-content-center align-items-center">
                  |
                </span>
                <Nav.Link as={NavLink} to="/b4/orders">
                  ORDERS <i className="bi bi-truck mx-1"></i>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user.id !== null ? (
              user.isAdmin === true ? (
                <>
                  <Link to="#" onClick={handleLogout} className="logout-link">
                    <Button variant="danger" className="rounded-0 px-5">
                      Log Out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/b4/cart/get-cart">
                    <i class="bi bi-cart3"></i>
                  </Nav.Link>
                  <span className="divider mx-3 d-none d-lg-flex justify-content-center align-items-center">
                    |
                  </span>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="logout-link d-flex align-items-center"
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="danger" className="rounded-0 px-4">
                      Log Out
                    </Button>
                  </Link>
                </>
              )
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/b4/register"
                  className="register-link"
                >
                  REGISTER
                </Nav.Link>
                <span className="divider mx-3 d-none d-lg-flex justify-content-center align-items-center">
                  |
                </span>
                <Link
                  as={NavLink}
                  to="/b4/login"
                  style={{ textDecoration: "none" }}
                >
                  <Button className="btn-pink rounded-0 px-5">LOG IN</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
