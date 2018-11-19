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
        title: '2018-2019 Fall Season'
    },
    '2018spring': {
        sidebar: spring2018Sidebar,
        title: '2018 Spring Season'
    }
};

router.route('/:year/:season')
    .get((req, res) => {
        const { year, season } = req.params;
        res.render('seasonView', seasonDictionary[year + season]);
    });

router.route('/:year/:season/schedule')
    .get((req, res) => {
        const { year, season } = req.params;
        res.render('scheduleView', {
            sidebar: seasonDictionary[year + season].sidebar,
            title: 'Schedule'
        });
    });

router.route('/:year/:season/scores')
    .get((req, res) => {
        const { year, season } = req.params;
        res.render('scoresView', {
            sidebar: seasonDictionary[year + season].sidebar,
            title: 'Scores'
        });
    });

module.exports = router;
