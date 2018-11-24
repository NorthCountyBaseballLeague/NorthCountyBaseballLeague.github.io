const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:admin');

const adminRouter = express.Router();
const schedules = [
    {
        _id: '2018fall',
        schedule: [
            {
                date: '10/21/2018',
                time: '9 AM',
                visitors: "A's",
                home: 'Pauma',
                field: 'Pauma',
                winner: 'Pauma'
            },
            {
                date: '10/21/2018',
                time: '12:30 PM',
                visitors: 'Toros',
                home: 'Tomateros',
                field: 'Pauma',
                winner: 'Toros'
            },
            {
                date: '10/21/2018',
                time: '9 AM',
                visitors: 'Nationals',
                home: 'Saints',
                field: 'Orange Glen',
                winner: 'Saints'
            },
            {
                date: '10/21/2018',
                time: 'BYE',
                visitors: 'Royals',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '10/28/2018',
                time: '10 AM',
                visitors: 'Pauma',
                home: 'Toros',
                field: 'Pauma',
                winner: 'Pauma'
            },
            {
                date: '10/28/2018',
                time: '9 AM',
                visitors: 'Nationals',
                home: 'Royals',
                field: 'Valley Center',
                winner: 'Nationals'
            },
            {
                date: '10/28/2018',
                time: '9 AM',
                visitors: 'Saints',
                home: 'Tomateros',
                field: 'Orange Glen',
                winner: 'Saints'
            },
            {
                date: '10/28/2018',
                time: 'BYE',
                visitors: "A's",
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '11/4/2018',
                time: '9 AM',
                visitors: 'Pauma',
                home: 'Nationals',
                field: 'Pauma',
                winner: 'Pauma'
            },
            {
                date: '11/4/2018',
                time: '12:30 PM',
                visitors: 'Tomateros',
                home: "A's",
                field: 'Pauma',
                winner: 'Tomateros'
            },
            {
                date: '11/4/2018',
                time: '9 AM',
                visitors: 'Royals',
                home: 'Saints',
                field: 'Orange Glen',
                winner: 'Saints'
            },
            {
                date: '11/4/2018',
                time: 'BYE',
                visitors: 'Toros',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '11/11/2018',
                time: '10 AM',
                visitors: 'Tomateros',
                home: 'Nationals',
                field: 'Pauma',
                winner: 'Nationals'
            },
            {
                date: '11/11/2018',
                time: '10 AM',
                visitors: "A's",
                home: 'Royals',
                field: 'Valley Center',
                winner: "A's"
            },
            {
                date: '11/11/2018',
                time: '9 AM',
                visitors: 'Toros',
                home: 'Saints',
                field: 'Orange Glen',
                winner: 'Saints'
            },
            {
                date: '11/11/2018',
                time: 'BYE',
                visitors: 'Pauma',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '11/18/2018',
                time: '9 AM',
                visitors: 'Saints',
                home: 'Pauma',
                field: 'Pauma',
                winner: 'Pauma'
            },
            {
                date: '11/18/2018',
                time: '12:30 PM',
                visitors: 'Toros',
                home: "A's",
                field: 'Pauma',
                winner: 'Toros'
            },
            {
                date: '11/18/2018',
                time: '9 AM',
                visitors: 'Royals',
                home: 'Tomateros',
                field: 'Valley Center',
                winner: 'Tomateros'
            },
            {
                date: '11/18/2018',
                time: 'BYE',
                visitors: 'Nationals',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '12/2/2018',
                time: '10 AM',
                visitors: 'Nationals',
                home: 'Toros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '12/2/2018',
                time: '9 AM',
                visitors: 'Pauma',
                home: 'Royals',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '12/2/2018',
                time: '9 AM',
                visitors: 'Saints',
                home: "A's",
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '12/2/2018',
                time: 'BYE',
                visitors: 'Tomateros',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '12/9/2018',
                time: '9 AM',
                visitors: 'Tomateros',
                home: 'Pauma',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '12/9/2018',
                time: '12:30 PM',
                visitors: "A's",
                home: 'Nationals',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '12/9/2018',
                time: '9 AM',
                visitors: 'Royals',
                home: 'Toros',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '12/9/2018',
                time: 'BYE',
                visitors: 'Saints',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '12/16/2018',
                time: '9 AM',
                visitors: 'Pauma',
                home: "A's",
                field: 'Pauma',
                winner: ''
            },
            {
                date: '12/16/2018',
                time: '12:30 PM',
                visitors: 'Tomateros',
                home: 'Toros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '12/16/2018',
                time: '9 AM',
                visitors: 'Saints',
                home: 'Nationals',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '12/16/2018',
                time: 'BYE',
                visitors: 'Royals',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '1/6/2019',
                time: '10 AM',
                visitors: 'Toros',
                home: 'Pauma',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '1/6/2019',
                time: '9 AM',
                visitors: 'Royals',
                home: 'Nationals',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '1/6/2019',
                time: '9 AM',
                visitors: 'Tomateros',
                home: 'Saints',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '1/6/2019',
                time: 'BYE',
                visitors: "A's",
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '1/13/2019',
                time: '9 AM',
                visitors: 'Nationals',
                home: 'Pauma',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '1/13/2019',
                time: '12:30 PM',
                visitors: "A's",
                home: 'Tomateros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '1/13/2019',
                time: '9 AM',
                visitors: 'Saints',
                home: 'Royals',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '1/13/2019',
                time: 'BYE',
                visitors: 'Toros',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '1/20/2019',
                time: '10 AM',
                visitors: 'Nationals',
                home: 'Tomateros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '1/20/2019',
                time: '10 AM',
                visitors: 'Royals',
                home: "A's",
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '1/20/2019',
                time: '9 AM',
                visitors: 'Saints',
                home: 'Toros',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '1/20/2019',
                time: 'BYE',
                visitors: 'Pauma',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '1/27/2019',
                time: '10 AM',
                visitors: "A's",
                home: 'Toros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '1/27/2019',
                time: '9 AM',
                visitors: 'Tomateros',
                home: 'Royals',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '1/27/2019',
                time: '9 AM',
                visitors: 'Pauma',
                home: 'Saints',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '1/27/2019',
                time: 'BYE',
                visitors: 'Nationals',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '2/3/2019',
                time: '10 AM',
                visitors: 'Toros',
                home: 'Nationals',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '2/3/2019',
                time: '9 AM',
                visitors: 'Royals',
                home: 'Pauma',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '2/3/2019',
                time: '9 AM',
                visitors: "A's",
                home: 'Saints',
                field: 'Orange Glen',
                winner: ''
            },
            {
                date: '2/3/2019',
                time: 'BYE',
                visitors: 'Tomateros',
                home: '',
                field: '',
                winner: ''
            },
            {
                date: '2/10/2019',
                time: '9 AM',
                visitors: 'Pauma',
                home: 'Tomateros',
                field: 'Pauma',
                winner: ''
            },
            {
                date: '2/10/2019',
                time: '12:30 PM',
                visitors: 'Nationals',
                home: "A's",
                field: 'Pauma',
                winner: ''
            },
            {
                date: '2/10/2019',
                time: '9 AM',
                visitors: 'Toros',
                home: 'Royals',
                field: 'Valley Center',
                winner: ''
            },
            {
                date: '2/10/2019',
                time: 'BYE',
                visitors: 'Saints',
                home: '',
                field: '',
                winner: ''
            }
        ]
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
