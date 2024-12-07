const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String }, // Optional for group chats
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
