const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// 註冊路由
router.post('/register', register);

// 登入路由
router.post('/login', login);

module.exports = router;