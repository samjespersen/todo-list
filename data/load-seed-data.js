const client = require('../lib/client');
const list = require('./todo.js');

client.connect()
    .then(() => {
        return Promise.all(
            list.map(item => {
                return client.query(`
              INSERT INTO list (text, date_added, completed)
              VALUES ($1, $2, $3);
              `,
                [item.text, item.date_added, item.completed]);
            })
        );
    })
    .then(
        () => console.log('List data seeded successfully'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });