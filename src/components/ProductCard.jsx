import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Button onClick={() => navigate(`/products/${product.id}`)}>View Details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;