const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS list;
        `);
    })
    .then(
        () => console.log('List table dropped'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });