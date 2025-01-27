const express = require('express');
const app = require('./app');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teamRoutes = require('./routes/teams');
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/admin', adminRoutes);




io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
);


connectDB();
