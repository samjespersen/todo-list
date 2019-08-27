// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

// Database Client
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

//routes
app.get('/api/list', (req, res) => {
    client.query(`
        SELECT * FROM list
        ORDER BY date_added ASC;
        `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/list', (req, res) => {
    const item = req.body;
    client.query(`
        INSERT INTO list (text, date_added, completed)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    [item.text, item.date_added, false]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});



// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});