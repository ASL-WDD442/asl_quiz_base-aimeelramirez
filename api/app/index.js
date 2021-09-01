//load imports
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');
const cors = require('cors');

//routes
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const choicesRouter = require('./routes/choices');
const usersRouter = require('./routes/auth');
// create express routes
const app = express();
// checks if content-type is json & parses into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganDebug('api:request', 'dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie");
    next();
})
app.use(cors({ origin: true }));

// set up to use router
app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);
app.use('/choices', choicesRouter);
app.use('/auth', usersRouter);

//handling middleware
// esline-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    error('ERROR FOUND:', err);
    res.sendStatus(500);
})

// export the express app
module.exports = app;