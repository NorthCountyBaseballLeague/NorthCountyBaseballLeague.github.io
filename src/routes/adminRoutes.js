const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:admin');

const adminRouter = express.Router();
const schedules = [
    {
        _id: '2018fall',
        schedule: {
        }
    },
    {
        _id: '2018spring',
        schedule: {
        }
    }
];

function router() {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'NCBLWebsite';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to the server');

                    const db = client.db(dbName);

                    await schedules.forEach((schedule) => {
                        db.collection('schedules').save(schedule);
                    });
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
                res.redirect('/home');
            }());
        });
    return adminRouter;
}

module.exports = router;
