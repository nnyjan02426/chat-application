const User = require('../models/user');

// 更新用戶資料
exports.updateProfile = async (req, res) => {
  try {
    const { username, avatar } = req.body;
    const userId = req.user.id; // 從認證中間件取得用戶ID

    const user = await User.findByIdAndUpdate(
      userId, 
      { username, avatar }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: '用戶未找到' });
    }

    res.json({
      message: '用戶資料更新成功',
      user: { 
        id: user._id, 
        username: user.username, 
        avatar: user.avatar 
      }
    });
  } catch (error) {
    res.status(500).json({ message: '更新用戶資料失敗', error: error.message });
  }
};

// 取得用戶資料
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: '用戶未找到' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: '取得用戶資料失敗', error: error.message });
  }
};