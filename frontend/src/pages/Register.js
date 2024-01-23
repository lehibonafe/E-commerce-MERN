import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  // state hooks to store the values of input fields for Registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // state of the button
  const [isActive, setIsActive] = useState(false);
  
  // states
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(mobileNo);
  console.log(password);
  console.log(confirmPassword);
  
  // useEffect() will only run once the firstName, lastName, email, mobileNo, password, confirmPassword state has been changed.
  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo.length >= 10 &&
      password === confirmPassword
      ) {
        // enables the button
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);
    
    function registerUser(event) {
      event.preventDefault(); // prevents the default behavior of an event. Specifically in our case submit event, it will prevent the refresh/redirection of the page
      
      fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Request body
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          password: password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Registered Succesfully') {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
          // Use SweetAlert for success message
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: data.message
          });
        } else {
          // Use SweetAlert for error message
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: data.message
          });
        }
      });
    }
    
    // event.target.value - gets the value from the input box (Form.Control)
    
    return (
      <Form
      onSubmit={(event) => registerUser(event)}
      className="p-4 mb-3 shadow-lg mx-auto mt-5 bg-white"
      style={{ maxWidth: "600px" }}
      >
      <h2 className="my-1 text-center">Register</h2>
      <div className="row mt-5">
      <div className="col-md-6">
      <Form.Group>
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      First Name:
      </Form.Label>
      <Form.Control
      type="text"
      placeholder="Enter First Name"
      required
      onChange={(event) => setFirstName(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      </div>
      <div className="col-md-6">
      <Form.Group>
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      Last Name:
      </Form.Label>
      <Form.Control
      type="text"
      placeholder="Enter Last Name"
      required
      onChange={(event) => setLastName(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      </div>
      </div>
      <Form.Group className="mt-3">
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      Mobile No:
      </Form.Label>
      <Form.Control
      type="text"
      placeholder="Enter Mobile No"
      required
      onChange={(event) => setMobileNo(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      <Form.Group className="mt-3">
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      Email:
      </Form.Label>
      <Form.Control
      type="email"
      placeholder="Enter Email"
      required
      onChange={(event) => setEmail(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      <Form.Group className="mt-3">
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      Password:
      </Form.Label>
      <Form.Control
      type="password"
      placeholder="Enter Password"
      required
      onChange={(event) => setPassword(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      <Form.Group className="mt-3">
      <Form.Label style={{ padding: "3px", fontWeight: "bold" }}>
      Confirm Password:
      </Form.Label>
      <Form.Control
      type="password"
      placeholder="Confirm Password"
      required
      onChange={(event) => setConfirmPassword(event.target.value)}
      style={{ padding: "8px" }}
      />
      </Form.Group>
      {isActive ? (
        <Button
        className="w-100"
        variant="primary"
        type="submit"
        id="submitBtn"
        >
        Submit
        </Button>
        ) : (
          <Button
          className="w-100 mt-3"
          variant="primary"
          type="submit"
          id="submitBtn"
          disabled
          style={{ backgroundColor: "#33335b", borderColor: "#ffffff" }}
          >
          Submit
          </Button>
          )}
          <div className="text-center mt-4">
          <p>
          Already have an account?{" "}
          <Link to="/b4/login" style={{ color: "#cc5588" }}>
          Click here
          </Link>{" "}
          to log in.
          </p>
          </div>
          </Form>
          );
        }
        