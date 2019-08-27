const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE list (
                id SERIAL PRIMARY KEY NOT NULL,
                text VARCHAR(256) NOT NULL UNIQUE,
                date_added VARCHAR(256) NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT FALSE
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