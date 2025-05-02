# 📌 GraphQL Schema Documentation

## 🔹 Overview
This document provides details about the **GraphQL Schema** used in the E-Commerce API.  
It explains the **types, queries, and mutations** implemented to handle **Orders, Products, Customers, and Shipping Details**.

---

## 📌 Step 1: Setting Up GraphQL in the Project
To use GraphQL, the necessary dependencies were installed. A new `graphql` folder was created containing:
- `schema.js`: Defines the GraphQL schema.
- `resolvers.js`: Implements resolver functions.

GraphQL was then integrated into `server.js`, enabling access via a `/graphql` endpoint.

---

## 📌 Step 2: Defining GraphQL Schema
The schema consists of **types, queries, and mutations**.  

### ✅ **Object Types**
- **Customer Type**: Represents customer details such as ID, name, and email.
- **Product Type**: Contains product details including ID, name, and price.
- **ShippingDetails Type**: Stores information about shipping status, carrier, and tracking number.
- **Order Type**: Defines an order, including customer, product, quantity, total price, and associated shipping details.

---

## 📌 Step 3: Implementing Queries
Queries are used to **fetch data** from the GraphQL API.  

### ✅ **Available Queries**
- **Get Orders by Customer**: Fetches all orders placed by a specific customer.
- **Get Order Details**: Retrieves details of a specific order.
- **Get Shipping Details**: Fetches tracking and shipping information for an order.
- **Get Product Recommendations**: Suggests products based on a customer's past purchases.
- **Get Paginated Orders**: Implements pagination, filtering, and sorting.

---

## 📌 Step 4: Implementing Mutations
Mutations allow **creating, updating, and deleting** orders.

### ✅ **Available Mutations**
- **Create an Order**: Adds a new order to the system.
- **Update an Order**: Modifies an existing order's quantity and total price.
- **Delete an Order**: Removes an order by its ID.

---

## 📌 Step 5: Implementing Resolvers
Resolvers define how GraphQL queries and mutations retrieve or modify data.  
Each query and mutation is linked to a resolver function that interacts with the database.

---

## 📌 Step 6: Testing the GraphQL API
The API was tested using **GraphQL Playground** and **Postman**.

### ✅ **Testing Methods**
1. **GraphQL Playground**  
   - Accessed through a browser at the `/graphql` endpoint.  
   - Used to run queries and mutations in an interactive UI.  

2. **Postman**  
   - Sent GraphQL queries as POST requests to the API endpoint.  
   - Used for testing mutations and query responses.

---

## 📌 Step 7: Deploying to Render
The GraphQL API was deployed using **Render**.

### ✅ **Deployment Steps**
1. **Pushed code to GitHub** and linked the repository to Render.
2. **Configured the Render Web Service**, setting up build and start commands.
3. **Added environment variables** in the Render dashboard.
4. **Deployed and tested the API** using the generated Render URL.

---

## 📌 Step 8: Final Checklist
✔ **GraphQL schema defined** (`schema.js`)  
✔ **Resolvers implemented** (`resolvers.js`)  
✔ **Queries and Mutations tested**  
✔ **Pagination, sorting, and filtering added**  
✔ **Deployment to Render completed**  

---

## 📌 Conclusion
🚀 **GraphQL API is successfully implemented, tested, and deployed!**  
It provides a **flexible, efficient, and scalable** way to handle customer orders, shipping, and recommendations.

---

📌 **Deployed API Link:**  
👉 [https://your-deployment-url/graphql](https://your-deployment-url/graphql)  

