const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const userRouter = require('./routes/UserRoute');
const favoriteRouter = require('./routes/favoriteRoute');
// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Routes

app.use('/user', userRouter);
app.use('/favorites', favoriteRouter);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});