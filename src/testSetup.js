jest.setTimeout(30000);

const mongoose = require('mongoose');
const { app } = require('./app'); // Adjust the path as needed
const request = require('supertest');

// Set up Mongoose to use a test database
beforeAll(async () => {
  console.log('Connecting to MongoDB...');
  await mongoose.connect('mongodb://localhost/test-db');
  console.log('MongoDB connected!');
});

beforeEach(async () => {
  // Reset database before each test
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed!');
});

module.exports = request(app); // Export request function for other test files
