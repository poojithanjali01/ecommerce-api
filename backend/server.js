const express = require("express");
const swaggerDocs = require("./swagger");
const dotenv = require("dotenv");
const cors = require("cors");
const orderRoutes = require("./routes/orders");
const winston = require("winston");
const expressPrometheus = require("express-prometheus-middleware");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema"); // Import GraphQL schema

dotenv.config();
const app = express();

// Configure Winston Logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs.log" })
    ]
});

// Middleware for Logging Requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Configure Prometheus Monitoring
app.use(expressPrometheus({
    metricsPath: "/metrics",
    collectDefaultMetrics: true
}));

app.use(express.json());
app.use(cors());

// REST API Routesnpm start
app.get('/', (req, res) => {
    res.send('<h2>Status: Healthy</h2>');
  });

app.use("/api", orderRoutes);

// GraphQL API
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true, // Enables GraphQL Playground (for testing)
    })
);

const PORT = process.env.PORT || 5000;

// Initialize Swagger Docs
swaggerDocs(app, PORT);

// Start Server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});