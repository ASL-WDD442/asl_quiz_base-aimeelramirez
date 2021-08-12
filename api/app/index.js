
const error = require('debug')('api:error')
const express = require('express')
const morganDebug = require('morgan-debug')
const path = require('path');
//get imported route index
const choiceRouter = require('./../routes/choiceRoutes');
const quizRouter = require('./../routes/quizRoutes');
const questionRouter = require('./../routes/questionRoutes');
const userRouter = require('./../routes/userRoutes');


const indexRouter = (app) => {
    app.use(express.static(path.join(__dirname, '/public')));
    // set port
    const port = 4000;
    app.set('port', port);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    console.log(`server is listening at post ${port}.`);
    // app.use(morganDebug('api:request', 'dev'))
    app.route('/').get((req, res, next) => {
        // error('ERROR FOUND:', err)
        res.sendStatus(200)
        console.log('hello')
    })

    //Get Routers 
    choiceRouter(app);
    quizRouter(app)
    questionRouter(app)
    userRouter(app)

}


module.exports = indexRouter
