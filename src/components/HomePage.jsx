import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the FakeStore</h1>
      <p>Browse and manage products from a mock API.</p>
      <Button onClick={() => navigate('/products')}>Go to Products</Button>
    </Container>
  );
}

export default Home;