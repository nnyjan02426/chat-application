const Chatroom = require('../models/chatroom'); // Import the Chatroom model

// Create or Get a Chatroom
exports.createChatroom = async (req, res) => {
  const { participants } = req.body; // Array of participant IDs
  const userId = req.user.id; // Current user from auth middleware

  try {
    // Ensure the current user is part of the participants
    if (!participants.includes(userId)) {
      participants.push(userId);
    }

    // Check if a chatroom with the exact participants already exists
    let chatroom = await Chatroom.findOne({
      participants: { $all: participants, $size: participants.length },
    });

    if (!chatroom) {
      // Create a new chatroom
      chatroom = new Chatroom({
        roomId: `room-${Date.now()}`, // Generate a unique room ID
        participants,
      });
      await chatroom.save();
    }

    res.status(201).json({ chatroom });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create or fetch chatroom', error: error.message });
  }
};

// Fetch All Chatrooms for a User
exports.getChatrooms = async (req, res) => {
  const userId = req.user.id; // Current user from auth middleware

  try {
    const chatrooms = await Chatroom.find({ participants: userId }).populate('participants', 'username avatar');
    res.json({ chatrooms });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chatrooms', error: error.message });
  }
};

// Fetch a Single Chatroom by Room ID
exports.getChatroomById = async (req, res) => {
  const { roomId } = req.params;

  try {
    const chatroom = await Chatroom.findOne({ roomId }).populate('participants', 'username avatar');
    if (!chatroom) {
      return res.status(404).json({ message: 'Chatroom not found' });
    }
    res.json({ chatroom });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chatroom', error: error.message });
  }
};

