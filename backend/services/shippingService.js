const pool = require("../db");

const getShippingStatus = async (orderId) => {
    try {
        console.log(`Fetching shipping status for order ID: ${orderId}`);
        const [rows] = await pool.query("SELECT * FROM shipping WHERE order_id = ?", [orderId]);

        if (rows.length === 0) {
            console.log("No tracking info found");
            return { message: "No tracking information found" };
        }

        console.log("Tracking data:", rows[0]);
        return rows[0];

    } catch (error) {
        console.error("Error fetching shipping status:", error);
        return { message: "Shipping service unavailable" };
    }
};

module.exports = { getShippingStatus };
