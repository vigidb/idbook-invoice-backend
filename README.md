# Invoice API

## Overview

Invoice API is a robust backend service designed to manage invoices efficiently. It is built using Node.js, Express.js, and MongoDB, and offers features such as user authentication, invoice creation, retrieval, updating, and deletion. The API is designed with security, performance, and scalability in mind.

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Invoice Management**: Create, read, update, and delete invoices with comprehensive details such as items, billing information, and tax details.
- **Error Handling**: Standardized error responses for various scenarios.
- **Rate Limiting**: Prevent abuse by limiting the number of requests per user.
- **Input Validation**: Ensure data integrity and security.
- **Scalable Architecture**: Ready to handle a high volume of requests with MongoDB as the database.

## Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (JSON Web Token) for Authentication**
- **Mongoose** for MongoDB object modeling
- **Jest & Supertest** for testing
- **Swagger** for API documentation

## Project Structure

```plaintext
invoice-api/
│
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── invoiceController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/
│   ├── User.js
│   └── Invoice.js
├── routes/
│   ├── authRoutes.js
│   └── invoiceRoutes.js
├── tests/
│   ├── auth.test.js
│   └── invoice.test.js
├── utils/
│   └── jwtUtils.js
├── .env
├── app.js
└── server.js
```

## Setup Instructions

### Prerequisites

- Node.js v14 or above
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/invoice-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd invoice-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables by creating a `.env` file in the root directory. Refer to the `.env.example` file for the required variables:
   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/invoice-api
   JWT_SECRET=your_secret_key
   ```

### Running the Server

Start the server by running:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

### Scripts

The `package.json` file includes several scripts for common tasks:

- **`start`**: Runs the server in production mode.
  ```bash
  npm start
  ```
- **`dev`**: Runs the server in development mode with `nodemon` for automatic restarts.

  ```bash
  npm run dev
  ```

- **`test`**: Runs the test suite using `jest`.

  ```bash
  npm test
  ```

- **`lint`**: Lints your codebase using `eslint`.

  ```bash
  npm run lint
  ```

- **`docs`**: Generates API documentation using Swagger.

  ```bash
  npm run docs
  ```

- **`prettier`**: Formats the codebase using Prettier.
  ```bash
  npm run prettier
  ```

### API Documentation

The API documentation is available through Swagger. After starting the server, visit:

```
http://localhost:5000/api-docs
```

### Testing

Run the tests using:

```bash
npm test
```

### Deployment

1. Ensure MongoDB is connected to your production database.
2. Set environment variables in your production environment.
3. Use a process manager like `pm2` to run the server:
   ```bash
   pm2 start server.js
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [your-email@example.com](mailto:your-email@example.com).
