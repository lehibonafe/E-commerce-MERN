// ArchiveCourse.js
import React from "react";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';

export default function ArchiveCourse({ product, isActive, fetchData }) {
  const archiveToggle = () => {
  fetch(`${process.env.REACT_APP_API_URL}/products/${product}/archive`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then((data) => {
    if (!data.isActive) {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: 'Course Successfully Updated'
      })
      fetchData();
    } else {
      Swal.fire({
        title: 'Failed!',
        icon: 'error',
        text: 'Please try again'
      })
      fetchData();
    }
  })
  .catch(error => {
    console.error('Error during fetch:', error);
  });
};

const activateToggle = () => {
  fetch(`${process.env.REACT_APP_API_URL}/products/${product}/activate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(data => {
    if (!data.isActive) {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: 'Course Successfully Updated'
      })
      fetchData();
    } else {
      Swal.fire({
        title: 'Failed!',
        icon: 'error',
        text: 'Please try again'
      })
      fetchData();
    }
  })
}


  return (
    <Button 
      variant={isActive ? "danger" : "success"} 
      size="sm" 
      onClick={isActive ? archiveToggle : activateToggle}>
      {isActive ? "Disable" : "Enable"}
    </Button>
  );
  // pls uncomment after making functions SALAMUCH <3
}
