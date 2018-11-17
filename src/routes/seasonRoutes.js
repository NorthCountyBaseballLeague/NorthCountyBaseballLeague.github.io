const express = require('express');

const seasonRouter = express.Router();

const fall2018Sidebar = [
    { link: '/schedule', title: 'Schedule' },
    { link: '/scores', title: 'Scores' },
    { link: '/standings', title: 'Standings' }
];

const spring2018Sidebar = [
    { link: '/rosters', title: 'Rosters' },
    { link: '/schedule', title: 'Schedule' },
    { link: '/standings', title: 'Standings' },
    { link: '/playoffs', title: 'Playoffs' }
];

const seasonDictionary = {
    '2018Fall': {
        sidebar: fall2018Sidebar,
        title: '2018-2019 Fall Season'
    },
    '2018Spring': {
        sidebar: spring2018Sidebar,
        title: '2018 Spring Season'
    }
};

seasonRouter.route('/:year/:season')
    .get((req, res) => {
        const { year, season } = req.params;
        res.render('seasonView', seasonDictionary[year + season]);
    });


module.exports = seasonRouter;
