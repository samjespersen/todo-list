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

//Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});


// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

//routes
app.get('/api/list', (req, res) => {
    client.query(`
        SELECT * FROM list
        WHERE user_id = $1
        ORDER BY date_added ASC;
        `, [req.userId]
    )
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
        INSERT INTO list (text, date_added, completed, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
    [item.text, item.date_added, false, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Type "${item.text}" already exists`
                });
            }
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