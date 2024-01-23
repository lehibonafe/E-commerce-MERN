import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import UserOrders from "./pages/UserOrders";
import Cart from "./pages/Cart";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log("State: ");
    console.log(user); // checks the state
    console.log("Local storage");
    console.log(localStorage); // checks the localStorage
  }, [user]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result && typeof data.result.id !== undefined) {
          setUser({
            id: data.result.id,
            isAdmin: data.result.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/cart/get-cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:productId" element={<ProductView />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
