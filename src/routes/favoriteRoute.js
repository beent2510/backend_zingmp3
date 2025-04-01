const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');
const { authenticateToken } = require('../middleware/Authencation');


router.post('/add', authenticateToken, addFavorite);

router.get('/:user_id',authenticateToken, getFavorites);

router.delete('/:user_id/:song_id',authenticateToken, removeFavorite);

module.exports = router;
