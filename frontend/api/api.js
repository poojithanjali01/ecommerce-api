import axios from 'axios';

// Local backend API
const API_BASE = 'http://localhost:5000';

// FakeStore API
const FAKE_STORE_API = 'https://fakestoreapi.com';

export const api = {
  // ===== ORDER MANAGEMENT =====
  getRecentOrders: () => axios.get(`${API_BASE}/api/orders/recent`),
  getOrderSummary: () => axios.get(`${API_BASE}/api/orders/summary`),
  getOrderDetails: (id) => axios.get(`${API_BASE}/api/orders/${id}`),
  createOrder: (data) => axios.post(`${API_BASE}/api/orders`, data),
  updateOrder: (id, data) => axios.put(`${API_BASE}/api/orders/${id}`, data),
  deleteOrder: (id) => axios.delete(`${API_BASE}/api/orders/${id}`),
  getTracking: (id) => axios.get(`${API_BASE}/api/orders/${id}/tracking`),
  
  // Customers
  getCustomerOrders: (id) => axios.get(`${API_BASE}/api/customers/${id}/orders`),
  getRecommendations: (id) => axios.get(`${API_BASE}/api/customers/${id}/recommendations`),

  // ===== E-COMMERCE PRODUCTS =====
  // Electronics only endpoints
  getElectronics: () => axios.get(`${FAKE_STORE_API}/products/category/electronics`),
  getProduct: (id) => axios.get(`${FAKE_STORE_API}/products/${id}`),
  
  // Full products endpoints (commented out but available if needed)
  // getProducts: () => axios.get(`${FAKE_STORE_API}/products`),
  // getCategories: () => axios.get(`${FAKE_STORE_API}/products/categories`),
  // getCategoryProducts: (category) => axios.get(`${FAKE_STORE_API}/products/category/${category}`)
};

// Axios instance with default settings
const apiInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiInstance;