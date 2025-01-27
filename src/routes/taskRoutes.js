const express = require('express');
const multer = require('multer');
const path = require('path');
const folder='./uploads';

const fs = require('fs');
// Check if the folder exists, if not, create it
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}
// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Set a unique filename
  }
});

const upload = multer({ storage: storage });
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    addComment,
    addAttachment,
} = require('../controllers/taskController');
const {authMiddleware,roleMiddleware} = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authMiddleware, createTask); // Create a task
router.get('/', authMiddleware, getTasks); // Get tasks
router.put('/:taskId', authMiddleware, updateTask); // Update a task
router.delete('/:taskId', authMiddleware, deleteTask); // Delete a task

// Routes for comments and attachments
router.post('/:taskId/comments', authMiddleware, addComment); // Add a comment
router.post('/:taskId/attachments', authMiddleware, upload.array('attachments', 5), addAttachment); // Add an attachment


router.post('/task', upload.single('file'), (req, res) => {
  console.log('Received file:', req.file); // Debugging the file upload
  res.send('Task created!');
});


module.exports = router;
