import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom';

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    console.log(productsData);
    
    if (typeof productsData === 'object' && productsData !== null) {
      const productArr = Object.keys(productsData).map((key, index) => {
        const product = productsData[key];
        
        // Check if product is an object before accessing its properties
        if (typeof product === 'object' && product !== null) {
          return (
            <tr key={`${product._id}_${index}`}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
            </td>
            <td><EditProduct product={product._id} fetchData={fetchData}/></td>
            <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
            </tr>
            );
          } else {
            console.error(`Invalid product format for key: ${key}`);
            return null; // or handle the error as needed
          }
        });
        
        setProducts(productArr);
      } else {
        console.error("Invalid productsData format");
      }
    }, [productsData]);
    
    // Render your component JSX here
    return (
      <>
      <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center">Admin Dashboard</h1>
      <div>
      <AddProduct fetchData={fetchData} />
      <Button className='btn btn-success rounded m-2'>
  <Link to="/b4/orders" style={{ color: 'white', textDecoration: 'none' }}>
    Show User Orders
  </Link>
</Button>
      </div>  
    </div>
      <Table striped bordered hover responsive >
      <thead >
      <tr className="text-center">
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Availability</th>
      <th colSpan="2">Actions</th>
      </tr>
      </thead>
      <tbody>
      {products}
      </tbody>
      </Table>
      </>
      );
    }