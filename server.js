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

app.put('/api/list/:id', (req, res) => {
    const item = req.body;
    const id = req.params.id;
    let dateCompleted;
    let isCompleted;
    if(!item.completed) {
        dateCompleted = item.date_completed;
        isCompleted = true;
    } else {
        dateCompleted = '';
        isCompleted = false;
    }

    client.query(`
        UPDATE list
        SET completed = $2,
            date_completed = $3
        WHERE id = $1
        RETURNING *;
    `,
    [id, isCompleted, dateCompleted]
    )
        .then(result => {
            res.json(result.rows[0]);
        });

});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});