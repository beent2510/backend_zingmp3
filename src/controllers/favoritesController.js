const db = require('../config/db.js');


const getFavorites = async (req, res) => {
    const { user_id } = req.params;

    try {
        const [favorites] = await db.execute(
            'SELECT song_id, song_name, artist FROM favorites WHERE user_id = ?',
            [user_id]
        );

        if (favorites.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No favorites found for this user',
                data: null
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Favorites retrieved successfully',
            data: favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};

const addFavorite = async (req, res) => {
    try {
        const { user_id, song_id, song_name, artist } = req.body;
        const [result] = await db.execute('INSERT INTO favorites (user_id,song_id,song_name,artist) VALUES (?,?,?,?)', [user_id, song_id, song_name, artist]);

        const data = { id: result.favorite_id, user_id: user_id, song_id: song_id, song_name: song_name, artist: artist };
        res.status(201).json({
            status: 201,
            message: 'favorites created successfully',
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



const removeFavorite = async (req, res) => {
    const { user_id, song_id } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM favorites WHERE user_id = ? AND song_id = ?',
            [user_id, song_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Favorite song not found',
                data: null
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Song removed from favorites',
            data: { user_id, song_id }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};