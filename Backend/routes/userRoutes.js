const express = require('express');
const { updateProfile, getUserProfile, getUserById } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// 取得用戶資料（需要驗證）
router.get('/profile', authMiddleware, getUserProfile);

// 更新用戶資料（需要驗證）
router.put('/profile', authMiddleware, updateProfile);

// fetch user by id
router.get('/:id', authMiddleware, getUserById);


module.exports = router;
