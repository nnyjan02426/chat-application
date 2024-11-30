const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chat_application', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB 連接成功');
  } catch (error) {
    console.error('MongoDB 連接失敗:', error.message);
    // 退出進程
    process.exit(1);
  }
};

module.exports = connectDB;