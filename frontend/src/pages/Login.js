import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginImg from "../images/login.png";
import Swal from "sweetalert2";

export default function Login() {
  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);

  const { user, setUser } = useContext(UserContext);

  // useEffect() will be triggered every time the state of email and password changes
  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // successful login
        if (data.access_token) {
          localStorage.setItem("access", data.access_token);
          // setUser(data); // user = {access: adskjaslkdqwk }
          retrieveUserDetails(data.access_token);

                  // Use SweetAlert for successful login
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: data.message,
        });
      } else {
        // Use SweetAlert for unsuccessful login
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: data.message,
        });
      }
    });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }
  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('data:', data);
        setUser({
          id: data.result.id,
          isAdmin: data.result.isAdmin,
        });

        console.log(user);
      });
  };

  return user.id !== null ? (
    <Navigate to="/b4/products" />
  ) : (
    <div className="container mt-5 d-flex align-items-center justify-content-center">
      <div className="row col-md-8 mt-3">
        <div
          className="col-md-6 p-4 d-flex align-items-center"
          style={{ backgroundColor: "#313c5d" }}
        >
          <img className="w-100" src={LoginImg} />
        </div>
        <div
          className="col-md-6 p-4 shadow-lg d-flex align-items-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="mx-auto">
            <h2 className="text-center mb-4" style={{ color: "#33335b" }}>
              Account Log In
            </h2>
            <hr className="mx-auto" style={{ width: "80px" }}></hr>
            <Form className="mt-5" onSubmit={(e) => authenticate(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  type="submit"
                  className="btn w-100"
                  disabled={!isActive}
                  style={{ backgroundColor: "#313c5d", color: "#cc5588" }}
                >
                  LOG IN
                </Button>
              </div>
            </Form>
            <div className="text-center mt-5">
              <p>
                Don't have an account?{" "}
                <Link to="/b4/register" style={{ color: "#cc5588" }}>
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
