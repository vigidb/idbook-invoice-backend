const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Invoice API',
    version: '1.0.0',
    description: 'API for managing invoices',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI setup
const swaggerMiddleware = swaggerUi.serve;
const swaggerUiSetup = swaggerUi.setup(swaggerSpec);

module.exports = {
  swaggerMiddleware,
  swaggerUiSetup,
};
