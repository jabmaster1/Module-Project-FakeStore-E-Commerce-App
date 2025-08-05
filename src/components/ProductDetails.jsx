import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Spinner, Modal } from 'react-bootstrap';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const deleteProduct = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
      setShowConfirm(false);
      navigate('/products');
    });
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={product.image} style={{ height: '300px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <Button variant="danger" onClick={() => setShowConfirm(true)}>Delete</Button>{' '}
          <Button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</Button>
        </Card.Body>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteProduct}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;