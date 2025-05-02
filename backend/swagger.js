const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "Ecommerce order management API",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to API routes
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;