const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const { swaggerMiddleware, swaggerUiSetup } = require('./config/swagger');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
// app.use(rateLimiter);

// Home Page Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Invoice API</h1><p>Visit the <a href="/api-docs">API Documentation</a></p>');
});

// Swagger setup
app.use('/api-docs', swaggerMiddleware, swaggerUiSetup);

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
