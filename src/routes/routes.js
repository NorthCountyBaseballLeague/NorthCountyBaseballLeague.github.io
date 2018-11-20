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
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Schedule`;
        res.render('scheduleView', {
            sidebar: curSeason.sidebar,
            title
        });
    });

router.route('/:year/:season/scores')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Scores`;
        res.render('scoresView', {
            sidebar: curSeason.sidebar,
            title
        });
    });

router.route('/:year/:season/standings')
    .get((req, res) => {
        const { year, season } = req.params;
        const curSeason = seasonDictionary[year + season];
        const title = `${curSeason.title} Standings`;
        res.render('standingsView', {
            sidebar: curSeason.sidebar,
            title
        });
    });

module.exports = router;
