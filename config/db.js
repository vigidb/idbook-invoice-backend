const mongoose = require('mongoose');
const dotenv = require('dotenv');
const constants = require('./constants');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(constants.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected at: ${constants.MONGO_URI}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
