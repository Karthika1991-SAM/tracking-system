const Task = require('../models/Task'); // Make sure Task model is imported

const createTask = async (req, res) => {
    
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const task = await Task.create({ ...req.body, assignee: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignee: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a comment to a task
const addComment = async (req, res) => {
    const { taskId } = req.params;
    const { text } = req.body;
     
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const comment = {
            userId: req.user.id,
            text,
            createdAt: new Date(),
        };

        task.comments.push(comment);
        await task.save();

        res.status(200).json({ message: 'Comment added successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Add an attachment to a task
const addAttachment = async (req, res) => {
    const { taskId } = req.params;
    const file = req.files;
   
console.log(req.files); // For multiple files
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
 
        if (file) {
            req.files.forEach(file => {
                
                task.attachments.push(file.path);
            });
          
            await task.save();
            res.status(200).json({ message: 'Attachment added successfully', task });
        } else {
            res.status(400).json({ error: 'No file uploaded' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask , addAttachment, addComment ,deleteTask , updateTask, getTasks};