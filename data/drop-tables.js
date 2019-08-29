const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS list;
            DROP TABLE IF EXISTS users;
        `);
    })
    .then(
        () => console.log('List table dropped'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });