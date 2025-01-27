
const request = require('../testSetup');
const Team = require('../models/Team');  // Adjust to your team model
const User = require('../models/User');

describe('Team Management', () => {

  let user;
  
  beforeEach(async () => {
    user = new User({ email: 'testuser@example.com', password: 'password123', username: 'testuser' });
    await user.save();
  });

  it('should create a new team', async () => {
    const teamData = { name: 'Development Team', description: 'Team for development work' };
    
    const res = await request.post('/api/teams').set('Authorization', `Bearer ${user.token}`).send(teamData);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Team created successfully');
  });

  it('should add a user to a team', async () => {
    const team = new Team({ name: 'Development Team', description: 'Development tasks' });
    await team.save();

    const res = await request.post(`/api/teams/${team._id}/join`).set('Authorization', `Bearer ${user.token}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User added to the team');
  });

});
