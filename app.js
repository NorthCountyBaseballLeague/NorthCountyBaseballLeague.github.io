const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'pug');

const seasons = [
    { link: '/2018/Fall', title: '2018-2019 Fall Season' },
    { link: '/2018/Spring', title: '2018 Spring Season' }
];

const seasonRouter = require('./src/routes/seasonRoutes');

app.use('/', seasonRouter);

app.get('/', (req, res) => {
    res.render('index', { seasons });
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
