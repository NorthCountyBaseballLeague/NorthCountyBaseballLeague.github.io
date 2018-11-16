const express = require('express');

const seasonRouter = express.Router();

function router(sidebar, title) {
    seasonRouter.route('/')
        .get((req, res) => {
            res.render('seasonView', {
                sidebar,
                title
            });
        });

    return seasonRouter;
}

module.exports = router;
