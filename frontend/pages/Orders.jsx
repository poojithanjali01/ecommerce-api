import { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  Table, 
  Modal, 
  Form, 
  Alert, 
  Spinner,
  Badge,
  Card,
  Row,
  Col,
  InputGroup,
  ListGroup
} from 'react-bootstrap';
import { 
  Plus, 
  Pencil, 
  Trash, 
  Truck,
  Person,
  ArrowClockwise,
  Search,
  Eye
} from 'react-bootstrap-icons';
import { api } from '../api/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFormState = {
    customer_id: '',
    product_id: '',
    quantity: 1,
    total_price: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setShowDetails(false);
      const [recentRes] = await Promise.all([
        api.getRecentOrders(),
        api.getOrderSummary()
      ]);
      
      if (recentRes && recentRes.data) {
        setOrders(recentRes.data);
      } else {
        throw new Error("Invalid data received from API");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to load orders");
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchOrders();
      return;
    }

    try {
      setLoading(true);
      setShowDetails(false);
      const res = await api.getCustomerOrders(searchTerm);
      
      if (res && res.data) {
        setOrders(res.data);
      } else {
        throw new Error("Invalid search results");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Search failed");
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    if (!order) {
      console.error("Attempted to view details of undefined order");
      return;
    }
    
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (currentOrder) {
        await api.updateOrder(currentOrder.id, formData);
      } else {
        await api.createOrder(formData);
      }
      fetchOrders();
      handleCloseModal();
    } catch (err) {
      setError(err.message || "Failed to save order");
    }
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setFormData({
      customer_id: order.customer_id,
      product_id: order.product_id,
      quantity: order.quantity,
      total_price: order.total_price
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await api.deleteOrder(id);
        fetchOrders();
      } catch (err) {
        setError(err.message || "Failed to delete order");
      }
    }
  };

  const handleTrackOrder = async (id) => {
    try {
      setTrackingInfo(null);
      setShowTracking(true);
      
      const res = await api.getTracking(id);
      if (res && res.data) {
        setTrackingInfo(res.data);
      } else {
        throw new Error("Invalid tracking data received");
      }
    } catch (err) {
      console.error("Tracking error:", err);
      setError(err.message || "Failed to get tracking information");
      setShowTracking(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
    setFormData(initialFormState);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Order Management</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus /> New Order
        </Button>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by Customer ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              <Search />
            </Button>
            <Button variant="outline-secondary" onClick={fetchOrders}>
              <ArrowClockwise />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={showDetails ? 8 : 12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : orders.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>
                          <Badge bg="info" className="d-flex align-items-center gap-1">
                            <Person size={14} /> Customer {order.customer_id}
                          </Badge>
                        </td>
                        <td>Product {order.product_id}</td>
                        <td>{order.quantity}</td>
                        <td>${order.total_price}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => handleViewDetails(order)}
                              title="View Details"
                            >
                              <Eye />
                            </Button>
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              onClick={() => handleEdit(order)}
                              title="Edit"
                            >
                              <Pencil />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleDelete(order.id)}
                              title="Delete"
                            >
                              <Trash />
                            </Button>
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={() => handleTrackOrder(order.id)}
                              title="Track"
                            >
                              <Truck />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p>No orders found. Create a new order or adjust your search criteria.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {showDetails && selectedOrder && (
          <Col md={4}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5>Order #{selectedOrder.id} Details</h5>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Customer ID:</strong> {selectedOrder.customer_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Product ID:</strong> {selectedOrder.product_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Quantity:</strong> {selectedOrder.quantity}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total Price:</strong> ${selectedOrder.total_price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Date:</strong> {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString() : 'N/A'}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Order Form Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentOrder ? 'Edit Order' : 'Create New Order'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="number"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="number"
                name="product_id"
                value={formData.product_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="total_price"
                value={formData.total_price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentOrder ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tracking Modal */}
      <Modal show={showTracking} onHide={() => setShowTracking(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trackingInfo ? (
            <div>
              <p><strong>Status:</strong> {trackingInfo.status}</p>
              <p><strong>Last Updated:</strong> {trackingInfo.last_updated ? new Date(trackingInfo.last_updated).toLocaleString() : 'N/A'}</p>
              {trackingInfo.estimated_delivery && (
                <p><strong>Estimated Delivery:</strong> {new Date(trackingInfo.estimated_delivery).toLocaleDateString()}</p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading tracking information...</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTracking(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}