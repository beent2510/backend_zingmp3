const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const crypto = require('crypto');

const createUser = async (req, res) => {
    const {  email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO users ( email, password) VALUES (?, ?)',
            [ email, hashedPassword]
        );

        const data = {
            id: result.insertId,
            email: email
        };

        res.status(201).json({
            status: 201,
            message: 'resgister successful',
            data
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.execute(
            'SELECT user_id, email, password FROM users WHERE email = ?',
            [email]
        );

        if (user.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid password',
                data: null
            });
        }

        const token = jwt.sign(
            { userId: user[0].id, username: user[0].username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = crypto.randomBytes(40).toString('hex');
        await db.execute(
            'INSERT INTO refresh_tokens (user_id, refresh_token) VALUES (?, ?)',
            [user[0].user_id, refreshToken]
        );
        res.status(200).json({
            status: 200,
            message: 'Login successful',
            data: { token, refreshToken }
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }

};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({
            status: 400,
            message: 'Refresh token is required',
            data: null
        });
    }

    try {
        const [result] = await db.execute(
            'SELECT user_id FROM refresh_tokens WHERE refresh_token = ?',
            [refreshToken]
        );

        if (result.length === 0) {
            return res.status(403).json({
                status: 403,
                message: 'Invalid refresh token',
                data: null
            });
        }

        const userId = result[0].user_id;

        const newToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 200,
            message: 'New token generated successfully',
            data: { token: newToken }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const logout = async (req, res) => {

    res.status(200).json({
        status: 200,
        message: 'Logout successful',
        data: null
    });
};

const getUser = async (req, res) => {
    const userId = req.user.userId;

    try {
        const [result] = await db.execute(
            'SELECT user_id, email, created_at FROM users WHERE user_id = ?',
            [userId]
        );

        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
                data: null
            });
        }

        res.status(200).json({
            status: 200,
            message: 'User found',
            data: result[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};




module.exports = {
    createUser,
  
    getUser,
    login,
    logout,
    refreshToken
};