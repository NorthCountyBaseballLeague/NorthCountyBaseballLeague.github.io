const { MongoClient } = require('mongodb');
const debug = require('debug')('app:scheduleController');

function scheduleController(seasonDictionary) {
    function getSchedule(req, res) {
        const { year, season } = req.params;
        const id = year + season;
        const curSeason = seasonDictionary[id];
        const title = `${curSeason.title} Schedule`;

        const url = 'mongodb://localhost:27017';
        const dbName = 'NCBLWebsite';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');

                const db = client.db(dbName);

                const collection = await db.collection('schedules');

                const { schedule } = await collection.findOne({ _id: id });

                res.render('scheduleView', {
                    sidebar: curSeason.sidebar,
                    title,
                    schedule
                });
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    }

    return {
        getSchedule,
    };
}

module.exports = scheduleController;
