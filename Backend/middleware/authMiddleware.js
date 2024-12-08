const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  // 從 Authorization header 取得 token
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: '未提供認證token' });
  }

  try {
    // 驗證 token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 將用戶 ID 附加到 request 物件
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'token 無效', 
      error: error.message 
    });
  }
};

module.exports = authMiddleware;
