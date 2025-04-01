const express = require('express');
const { createUser, getUser, login, logout, refreshToken } = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/Authencation');
const router = express.Router();

router.get('/', authenticateToken, getUser);
router.post('/register', createUser);
router.post('/refresh-token', refreshToken);
router.post('/login', login)
router.post('/logout', logout)
module.exports = router;