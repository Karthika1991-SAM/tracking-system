
const request = require('../testSetup');
const Task = require('../models/Task'); // Adjust path to your task model
const User = require('../models/User');

describe('Task Management', () => {

  let user;
  
  beforeEach(async () => {
    // Create a test user
    user = new User({ email: 'testuser@example.com', password: 'password123', username: 'testuser' });
    await user.save();
  });

  it('should create a new task', async () => {
    const taskData = { title: 'New Task', description: 'This is a new task', dueDate: '2025-12-31', userId: user._id };
    
    const res = await request.post('/api/tasks').set('Authorization', `Bearer ${user.token}`).send(taskData);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Task created successfully');
  });

  it('should fetch tasks assigned to the user', async () => {
    const task = new Task({ title: 'Assigned Task', description: 'This is a task', dueDate: '2025-12-31', userId: user._id });
    await task.save();

    const res = await request.get('/api/tasks').set('Authorization', `Bearer ${user.token}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1); // The user should have 1 task assigned
  });

  it('should mark a task as completed', async () => {
    const task = new Task({ title: 'Incomplete Task', description: 'This task is not completed', dueDate: '2025-12-31', userId: user._id, status: 'open' });
    await task.save();
    
    const res = await request.patch(`/api/tasks/${task._id}`).set('Authorization', `Bearer ${user.token}`).send({ status: 'completed' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'completed');
  });

});
