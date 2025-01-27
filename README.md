# Task Management System

This is a task management system that allows teams to manage tasks, users, and teams. The system provides features for task assignment, user management, and team collaboration.

## Folder Structure

The project is organized as follows:

API Endpoints
Team Routes
GET /api/teams - Get all teams
POST /api/teams - Create a new team
PUT /api/teams/:id - Update a team
DELETE /api/teams/:id - Delete a team
User Routes
GET /api/users - Get all users
POST /api/users - Register a new user
PUT /api/users/:id - Update user information
DELETE /api/users/:id - Delete a user
Task Routes
GET /api/tasks - Get all tasks
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update task details
DELETE /api/tasks/:id - Delete a task
Middleware
Authentication middleware to protect routes
License
This project is licensed under the MIT License.