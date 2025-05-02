import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Spinner, 
  Alert, 
  Form, 
  Button, 
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import { api } from '../api/api';

export default function Recommendations() {
  const [customerId, setCustomerId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!customerId) {
      setError("Please enter a customer ID");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching recommendations for customer ${customerId}`); // Debug log
      
      const res = await api.getRecommendations(customerId);
      console.log("API Response:", res); // Debug log
      
      if (res && res.data) {
        // Handle both array and single product responses
        const recommendationsData = Array.isArray(res.data) ? res.data : [res.data];
        console.log("Processed recommendations:", recommendationsData); // Debug log
        
        if (recommendationsData.length > 0) {
          setRecommendations(recommendationsData);
        } else {
          setError("No recommendations found for this customer");
          setRecommendations([]);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Recommendations error:", err);
      setError(err.message || "Failed to fetch recommendations");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  // Debug effect
  useEffect(() => {
    console.log("Current recommendations state:", recommendations);
  }, [recommendations]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Product Recommendations</h1>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Customer ID</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="Enter customer ID"
                  required
                  min="1"
                />
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading...
                    </>
                  ) : (
                    'Get Recommendations'
                  )}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p>Loading recommendations...</p>
        </div>
      )}

      {recommendations.length > 0 ? (
        <div>
          <h4 className="mb-3">Recommended Products for Customer {customerId}</h4>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recommendations.map((product, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{product.name || `Product ${product.productId}`}</Card.Title>
                    <Card.Text>
                      <Badge bg="secondary">ID: {product.productId}</Badge>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">${product.price || 'N/A'}</span>
                      <Button variant="outline-primary" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        !loading && (
          <Card>
            <Card.Body className="text-center">
              <p className="text-muted">No recommendations to display. Enter a customer ID and click "Get Recommendations".</p>
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  );
}