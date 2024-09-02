require('dotenv').config();

const constants = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  HOST: process.env.HOST || "localhost", // Replace with your actual host
  PROTOCOL: process.env.PROTOCOL || "http" // Replace with your actual protocol
  // Add more environment variables as needed
};

module.exports = constants;
