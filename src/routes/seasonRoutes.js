const express = require('express');
// const bookController = require('../controllers/bookController');

const seasonRouter = express.Router();

function router(nav) {
    seasonRouter.route('/')
        .get((req, res) => {
            res.render('seasonView', {
                nav,
                title
            });
        });
}

module.exports = router;
