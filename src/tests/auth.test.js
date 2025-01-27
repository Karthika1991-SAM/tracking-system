const request = require('../testSetup');
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path as per your models

describe('Authentication', () => {
  
  it('should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password123', username: 'testuser' };
    
    const res = await request.post('/api/auth/register').send(userData);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login with valid credentials', async () => {
    const user = new User({ email: 'test@example.com', password: 'password123', username: 'testuser' });
    await user.save();
    
    const res = await request.post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with incorrect password', async () => {
    const res = await request.post('/api/auth/login').send({ email: 'test@example.com', password: 'wrongpassword' });
    
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

});
