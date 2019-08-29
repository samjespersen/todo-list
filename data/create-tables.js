const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                token VARCHAR(512),
                display_name VARCHAR(256) NOT NULL
            );
                
            CREATE TABLE list (
                id SERIAL PRIMARY KEY NOT NULL,
                text VARCHAR(256) NOT NULL UNIQUE,
                date_added VARCHAR(256) NOT NULL,
                date_completed VARCHAR(256),
                completed BOOLEAN NOT NULL DEFAULT FALSE,
                user_id INTEGER REFERENCES users(id)
            ); 
        `);
    })
    .then(
        () => console.log('Todo table created!'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });