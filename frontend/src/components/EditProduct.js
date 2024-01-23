import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProductId(data.products._id);
                setName(data.products.name);
                setDescription(data.products.description);
                setPrice(data.products.price);
            });

        setShowEdit(true);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setProductId('');
        setName('');
        setDescription('');
        setPrice('');
    }

    const editProduct = (e) => {
        e.preventDefault();
    
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => {
            console.log('Response Status:', res.status);
            return res.json();
        })
        .then(data => {
            console.log('Response Data:', data);
            if (data.message !== null) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product Successfully Updated'
                });
                closeEdit();
                fetchData();
            } else {
                console.log('Test');
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
                closeEdit();
                fetchData();
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    }


    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={event => setDescription(event.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} required />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
