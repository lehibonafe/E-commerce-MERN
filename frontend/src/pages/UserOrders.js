import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch product details: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.products.name || ""; // Assuming the product object has a "name" property
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      return "";
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.statusText}`);
      }

      const data = await response.json();

      // Assuming data.result is an array of users
      const user = data.result.find((user) => user._id === userId);

      console.log("data:", data);

      if (user) {
        console.log("email:", user.email);
        return user.email || ""; // Assuming the user object has an "email" property
      } else {
        console.error(`User with ID ${userId} not found`);
        return "";
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return "";
    }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/orders/all-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user orders: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Fetch product names and user email for each order
        const ordersWithDetails = await Promise.all(
          data.message.map(async (order) => {
            const productName = await fetchProductDetails(
              order.productsOrdered[0].productId
            );
            const userEmail = await fetchUserDetails(order.userId); // Use userId to fetch user details
            return {
              ...order,
              productName,
              email: userEmail, // Update the key to "email"
            };
          })
        );
        console.log(data);
        setOrders(ordersWithDetails || []);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching user orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Orders</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.email}</td>
              <td>{order.productName}</td>
              <td>{order.productsOrdered[0].quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{new Date(order.orderedOn).toLocaleString()}</td>{" "}
              {/* Format date using toLocaleString */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserOrders;
