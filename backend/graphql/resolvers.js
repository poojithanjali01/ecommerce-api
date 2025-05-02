const pool = require("../db");
const DataLoader = require("dataloader");

// Batch function to fetch multiple shipping details at once
const shippingLoader = new DataLoader(async (orderIds) => {
    const [rows] = await pool.query(
        "SELECT * FROM shipping WHERE order_id IN (?)", [orderIds]
    );

    // Map results by order_id
    const shippingMap = {};
    rows.forEach((shipping) => {
        shippingMap[shipping.order_id] = shipping;
    });

    // Return results in the same order as orderIds
    return orderIds.map(id => shippingMap[id] || null);
});

const resolvers = {
    // Get all orders for a customer
    getOrdersByCustomer: async (_, { customer_id }) => {
        const [rows] = await pool.query("SELECT * FROM orders WHERE customer_id = ?", [customer_id]);
        return rows;
    },

    // Get paginated orders for a customer (with filtering & sorting)
    getOrdersPaginated: async (_, { customer_id, first, after, minPrice, sortOrder }) => {
        try {
            let query = "SELECT * FROM orders WHERE customer_id = ?";
            const queryParams = [customer_id];

            // Apply minimum price filter if provided
            if (minPrice) {
                query += " AND total_price >= ?";
                queryParams.push(minPrice);
            }

            // Apply cursor-based pagination
            if (after) {
                query += " AND id > ?";
                queryParams.push(parseInt(after, 10));
            }

            // Sorting only by total_price
            const validSortOrders = ["ASC", "DESC"];
            const order = validSortOrders.includes(sortOrder) ? sortOrder : "ASC";
            query += ` ORDER BY total_price ${order}`;

            // Apply limit for pagination
            query += " LIMIT ?";
            queryParams.push(first + 1);

            const [rows] = await pool.query(query, queryParams);

            // Check if there's a next page
            const hasNextPage = rows.length > first;
            const edges = rows.slice(0, first).map(order => ({
                cursor: order.id.toString(),
                node: order
            }));

            return {
                edges,
                pageInfo: {
                    hasNextPage,
                    endCursor: edges.length ? edges[edges.length - 1].cursor : null
                }
            };
        } catch (error) {
            console.error("Error fetching paginated orders:", error);
            throw new Error("Failed to fetch orders with pagination");
        }
    },

    // Get details of a specific order
    getOrderDetails: async (_, { order_id }) => {
        const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [order_id]);
        return rows[0] || null;
    },

    // Create an Order
    createOrder: async (_, { customer_id, product_id, quantity, total_price }) => {
        const [result] = await pool.query(
            "INSERT INTO orders (customer_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
            [customer_id, product_id, quantity, total_price]
        );
        return { id: result.insertId, customer_id, product_id, quantity, total_price };
    },

    // Update an order
    updateOrder: async (_, { order_id, quantity, total_price }) => {
        await pool.query("UPDATE orders SET quantity = ?, total_price = ? WHERE id = ?", [quantity, total_price, order_id]);
        const [updatedRows] = await pool.query("SELECT * FROM orders WHERE id = ?", [order_id]);
        return updatedRows[0];
    },

    // Delete an order
    deleteOrder: async (_, { order_id }) => {
        await pool.query("DELETE FROM orders WHERE id = ?", [order_id]);
        return "Order deleted successfully";
    },

    // Fetch shipping details using DataLoader for batching
    getShippingDetails: async (_, { order_id }) => {
        return await shippingLoader.load(order_id);
    },

    // Get product recommendations for a customer
    getRecommendations: async (_, { customer_id }) => {
        try {
            const [rows] = await pool.query(`
                SELECT p.id, p.name, p.price 
                FROM recommendations r
                JOIN products p ON r.product_id = p.id
                WHERE r.customer_id = ?
            `, [customer_id]);

            return rows;
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            throw new Error("Failed to fetch recommendations");
        }
    }
};

module.exports = resolvers;
