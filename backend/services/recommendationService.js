const pool = require("../db");

const getRecommendations = async (customerId) => {
    try {
        console.log(`Fetching recommendations for customer ID: ${customerId}`);
        const [rows] = await pool.query(`
            SELECT p.id AS productId, p.name, p.price
            FROM recommendations r
            JOIN products p ON r.product_id = p.id
            WHERE r.customer_id = ?`, 
            [customerId]
        );

        if (rows.length === 0) {
            console.log("No recommendations found");
            return { message: "No recommendations available" };
        }

        console.log("Recommendations:", rows);
        return rows;

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return { message: "Recommendation service unavailable" };
    }
};

module.exports = { getRecommendations };
