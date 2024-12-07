const express = require('express');
const { createChatroom, getChatrooms } = require('../controllers/chatroomController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create or get a chatroom
router.post('/', authMiddleware, createChatroom);

// Get all chatrooms for the authenticated user
router.get('/', authMiddleware, getChatrooms);

// Get a specific chatroom by ID
router.get('/:roomId', authMiddleware, getChatroomById);

// Export the router
module.exports = router;

