import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => {
      setForm(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, form).then(() => setUpdated(true));
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      {updated && <Alert variant="success">Product updated!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3"><Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={form.price} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" rows={3} value={form.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3"><Form.Label>Category</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Update Product</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;