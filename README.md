# 🛒 E-Commerce API (REST & GraphQL)

This project is a **backend API** for an e-commerce platform.  
It provides functionalities for managing **Orders, Customers, Products, Shipping Details, and Recommendations**.  
The API supports **both REST and GraphQL**, allowing efficient data retrieval and CRUD operations.  

🚀 **Live API URL: [https://ecommerce-api-frontend.onrender.com/](https://ecommerce-api-frontend.onrender.com)**  
👉 **GraphQL Playground: [https://ecommerce-api-s8u7.onrender.com/graphql](https://ecommerce-api-s8u7.onrender.com/graphql/)**   
👉 **REST API Base URL: [https://ecommerce-api-s8u7.onrender.com/](https://ecommerce-api-s8u7.onrender.com/)**  
👉 **Swagger Docs: [https://ecommerce-api-s8u7.onrender.com/api-docs/](https://ecommerce-api-s8u7.onrender.com/api-docs/)** 

---

## 📌 **Table of Contents**
- [📌 Overview](#-overview)
- [🚀 Phase 1: REST API Implementation](#-phase-1-rest-api-implementation)
- [🔗 Phase 2: Third-Party Mock API (Shipping & Recommendations)](#-phase-2-third-party-mock-api-shipping--recommendations)
- [⚡ Phase 3: GraphQL API Implementation](#-phase-3-graphql-api-implementation)
- [📦 Installation & Setup](#-installation--setup)
- [📂 API Documentation](#-api-documentation)
- [🚀 Deployment (Render)](#-deployment-render)
---

## 📌 **Overview**
This project consists of:
- A **REST API** for traditional client-server communication.
- A **GraphQL API** for flexible data fetching.
- A **mock third-party API** for:
  - **Shipping Details** (tracking orders).
  - **Product Recommendations** based on customer purchase history.

---

## 🚀 **Phase 1: REST API Implementation**
The **initial phase** focused on implementing the REST API using:
- **Node.js**
- **MySQL** (as the database)
- **Swagger** (for API documentation)


### 📌 **REST API Endpoints**
| Method | Endpoint | Description |
|--------|----------|------------|
| `GET`  | `/apicustomers/:customer_id/orders` | Get all orders for a customer |
| `GET`  | `/api/orders/:order_id` | Get all orders for a customer |
| `POST` | `/api/orders` | Create a new order |
| `PUT`  | `/api/orders/:order_id` | Update an order |
| `DELETE` | `/api/orders/:order_id` | Delete an order |

📌 **Example REST API Request**:

GET api/customers/3/orders

---

## 🔗 **Phase 2: Third-Party Mock API (Shipping & Recommendations)**
In **Phase 2**, two external APIs were created:

1️⃣ **Shipping Details API**  
- Returns **tracking information** for orders.  
- Simulated as a **mock API** (to mimic a real-world shipping service).  

📌 **Example Response from Shipping API**:
```
{
    "id": 1,
    "order_id": 1,
    "status": "Delivered",
    "carrier": "FedEx",
    "tracking_number": "FX783901245637"
}
```

2️⃣ **Recommendation Service API**  
- Returns **product recommendations** for a customer based on past purchases.  

📌 **Example Response from Recommendation API**:
```json
[
    {
        "productId": 1,
        "name": "Smartphone X",
        "price": "899.99"
    },
    {
        "productId": 2,
        "name": "Wireless Headphones",
        "price": "149.99"
    },
    {
        "productId": 8,
        "name": "Digital Camera",
        "price": "599.99"
    }
]
```
---

## ⚡ **Phase 3: GraphQL API Implementation**
This phase replaced **REST endpoints** with **GraphQL Queries & Mutations** to allow:
- **Flexible data fetching** (client can request only the required fields).
- **Cursor-based pagination** for orders.
- **Sorting & filtering** of orders.
- **Integration with mock APIs** for shipping & recommendations.

### 📌 **GraphQL Features**
- **Get Orders by Customer**
- **Get Shipping Details**
- **Get Recommended Products**
- **Paginated Orders (cursor-based pagination)**
- **Sorting Orders by Price**
- **Order Filtering**
- **CRUD Operations (Create, Update, Delete Orders)**

📌 **Example GraphQL Query**  
(Get Orders by Customer)
```
query {
  getOrdersByCustomer(customer_id: 1) {
    id
    total_price
    quantity
    shipping_details {
      status
      carrier
      tracking_number
    }
  }
}
```
📌 **Example GraphQL Mutation (Create an Order)**
```
mutation {
  createOrder(customer_id: 2, product_id: 3, quantity: 1, total_price: 100.0) {
    id
    customer_id
    product_id
    total_price
  }
}
```

✅ **GraphQL performed better** in cases where multiple relationships were involved (e.g., fetching orders with shipping details).


## 📦 **Installation & Setup**
### 1️⃣ **Clone the Repository**

git clone [https://github.com/gpoojithanjali/ecommerce-api.git](https://github.com/gpoojithanjali/ecommerce-api.git)
cd ecommerce-api


### 2️⃣ **Install Dependencies**

npm install


### 3️⃣ **Configure Environment Variables**
Create a `.env` file and add:
```
DB_HOST= [your_db_host]
DB_USER= [your_db_user]
DB_PASS= [your_db_password]
DB_NAME= [your_db_name]
PORT= [your_port_no.]
```

### 4️⃣ **Run the Server Locally**
```
npm start
```
The API will be available at `http://localhost:5000/graphql`.


## 📂 **API Documentation**
### ✅ **Swagger for REST API**
- Open [https://ecommerce-api-s8u7.onrender.com/api-docs/](https://ecommerce-api-s8u7.onrender.com/api-docs/) in a browser.

### ✅ **GraphQL Playground**
- Open [https://ecommerce-api-s8u7.onrender.com/graphql/](https://ecommerce-api-s8u7.onrender.com/graphpl/) to test GraphQL queries.

---

## 🚀 **Deployment (Render)**
This API is **deployed on Render** with automatic updates from GitHub.

### ✅ **Steps for Deployment on Render**
1. Go to [Render](https://render.com).
2. Create a new **Web Service**.
3. Connect your **GitHub repository**.
4. Set **Environment Variables**:
  ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
  ```
5. Click **Deploy** and wait for Render to build and deploy.

✅ **Once deployed, the Website will be accessible at:**
- [https://ecommerce-api-frontend.onrender.com/](https://ecommerce-api-frontend.onrender.com/)
