import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddProduct() {
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://fakestoreapi.com/products', form).then(() => setSuccess(true));
  };

  return (
    <Container className="mt-4">
      <h2>Add Product</h2>
      {success && <Alert variant="success">Product created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3"><Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={form.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" rows={3} value={form.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Category</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;