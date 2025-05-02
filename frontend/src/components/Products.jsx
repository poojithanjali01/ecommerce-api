import { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Spinner, 
  Alert, 
  Button,
  Badge,
  ButtonGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../../api/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Electronics subcategories
  const electronicsCategories = [
    'all',
    'electronics',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let productsRes;
        if (activeFilter === 'all') {
          productsRes = await api.getElectronics();
        } else {
          // For subcategory filtering (if needed)
          productsRes = await api.getElectronics();
          productsRes.data = productsRes.data.filter(
            product => product.category === activeFilter
          );
        }
        
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeFilter]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Electronics Products</h1>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Electronics Subcategories Filter */}
      <div className="mb-4">
        <ButtonGroup>
          {electronicsCategories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? 'primary' : 'outline-secondary'}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p>Loading electronics...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {products.map(product => (
                <Col key={product.id}>
                  <Card className="h-100">
                    <div className="ratio ratio-4x3 bg-light">
                      <Card.Img 
                        variant="top" 
                        src={product.image} 
                        alt={product.title}
                        style={{ objectFit: 'contain', padding: '1rem' }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-truncate">{product.title}</Card.Title>
                      <Badge bg="info" className="mb-2">
                        {product.category}
                      </Badge>
                      <Card.Text className="fw-bold">${product.price}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <Button 
                        variant="primary" 
                        as={Link} 
                        to={`/products/${product.id}`}
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card>
              <Card.Body className="text-center">
                <p className="text-muted">
                  No electronics products found. Please try another category.
                </p>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
}