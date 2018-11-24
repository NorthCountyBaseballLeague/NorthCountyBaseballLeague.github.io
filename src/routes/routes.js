const express = require('express');

const router = express.Router();

const fall2018Sidebar = [
    { link: '/2018/fall/schedule', title: 'Schedule' },
    { link: '/2018/fall/scores', title: 'Scores' },
    { link: '/2018/fall/standings', title: 'Standings' }
];

const spring2018Sidebar = [
    { link: '/2018/spring/rosters', title: 'Rosters' },
    { link: '/2018/spring/schedule', title: 'Schedule' },
    { link: '/2018/spring/standings', title: 'Standings' },
    { link: '/2018/spring/playoffs', title: 'Playoffs' }
];

const seasonDictionary = {
    '2018fall': {
        sidebar: fall2018Sidebar,
        title: '2018-2019 Fall '
    },
    '2018spring': {
        sidebar: spring2018Sidebar,
        title: '2018 Spring '
    }
};

const scheduleController = require('../controllers/scheduleController')(seasonDictionary);
const standingsController = require('../controllers/standingsController')(seasonDictionary);

router.route('/:year/:season')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Season`;
        res.render('seasonView', {
            sidebar: curSeason.sidebar,
            title
        });
    });

router.route('/:year/:season/schedule')
    .get(scheduleController.getSchedule);

router.route('/:year/:season/scores')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Scores`;
        res.render('scoresView', {
            sidebar: curSeason.sidebar,
            title,
            scores: year + season
        });
    });

router.route('/:year/:season/standings')
    .get(standingsController.getStandings);

router.route('/:year/:season/rosters')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Rosters`;
        res.render('rostersView', {
            sidebar: curSeason.sidebar,
            title,
            rosters: year + season
        });
    });

router.route('/:year/:season/playoffs')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Playoffs`;
        res.render('playoffsView', {
            sidebar: curSeason.sidebar,
            title,
            playoffs: year + season
        });
    });

module.exports = router;
