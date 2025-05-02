import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Spinner, 
  Alert, 
  Button, 
  Badge, 
  Row, 
  Col,
  Stack
} from 'react-bootstrap';
import { ArrowLeft, CartPlus } from 'react-bootstrap-icons';
import { api } from '../../api/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch main product
        const productRes = await api.getProduct(id);
        setProduct(productRes.data);
        
        // Fetch related electronics (same category)
        const relatedRes = await api.getElectronics();
        setRelatedProducts(
          relatedRes.data
            .filter(p => p.id !== productRes.data.id)
            .slice(0, 3) // Show 3 related items
        );
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          {error}
          <Button variant="link" onClick={() => navigate(-1)}>
            <ArrowLeft /> Back to products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft /> Back to Electronics
      </Button>

      {product && (
        <>
          <Row className="mb-5">
            <Col md={6}>
              <div className="ratio ratio-1x1 bg-light mb-3 rounded">
                <img 
                  src={product.image} 
                  alt={product.title}
                  style={{ 
                    objectFit: 'contain', 
                    padding: '2rem',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </Col>
            <Col md={6}>
              <Card className="border-0 h-100">
                <Card.Body className="d-flex flex-column">
                  <Badge bg="info" className="mb-3 align-self-start">
                    {product.category}
                  </Badge>
                  <Card.Title as="h2" className="mb-3">{product.title}</Card.Title>
                  <Card.Text as="h3" className="my-4 text-danger">
                    ${product.price}
                  </Card.Text>
                  <Card.Text className="mb-4">{product.description}</Card.Text>
                  
                  <Stack direction="horizontal" gap={3} className="mt-auto">
                    <Button 
                      variant="outline-secondary" 
                      size="lg"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {relatedProducts.length > 0 && (
            <section className="mt-5">
              <h4 className="mb-4">Related Electronics</h4>
              <Row xs={1} md={3} className="g-4">
                {relatedProducts.map(item => (
                  <Col key={item.id}>
                    <Card className="h-100">
                      <div className="ratio ratio-4x3 bg-light">
                        <Card.Img 
                          variant="top" 
                          src={item.image} 
                          alt={item.title}
                          style={{ objectFit: 'contain', padding: '1rem' }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="text-truncate">{item.title}</Card.Title>
                        <Badge bg="secondary" className="mb-2">
                          {item.category}
                        </Badge>
                        <Card.Text className="fw-bold">${item.price}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0">
                        <Button 
                          variant="outline-primary" 
                          onClick={() => navigate(`/products/${item.id}`)}
                          className="w-100"
                        >
                          View Details
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          )}
        </>
      )}
    </Container>
  );
}