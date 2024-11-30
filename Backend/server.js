const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

console.log('開始載入路由...');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

console.log('初始化 Express...');
const app = express();
const server = http.createServer(app);

console.log('初始化 Socket.IO...');
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// 中間件
app.use(cors());
app.use(express.json());

// MongoDB 連接配置
const MONGODB_URI = 'mongodb://localhost:27017/chat_application';

// 連接數據庫
console.log('嘗試連接 MongoDB...');
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB 連接成功'))
.catch((err) => {
  console.error('MongoDB 連接失敗:', err);
  process.exit(1);
});

// 路由
console.log('設定路由...');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 基本路由測試
app.get('/', (req, res) => {
  res.send('聊天應用伺服器已啟動');
});

// Socket.IO 連接處理
console.log('設定 Socket.IO 事件...');
io.on('connection', (socket) => {
  console.log('新的客戶端連接：', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`用戶加入聊天室：${roomId}`);
  });

  socket.on('send_message', (messageData) => {
    console.log('收到消息:', messageData);
    io.to(messageData.roomId).emit('receive_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('客戶端已斷開連接');
  });
});

const PORT = process.env.PORT || 5000;

// 添加錯誤處理
process.on('uncaughtException', (error) => {
  console.error('未捕獲的異常:', error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`伺服器運行在 ${PORT} 端口`);
}).on('error', (error) => {
  console.error('伺服器啟動錯誤:', error);
});