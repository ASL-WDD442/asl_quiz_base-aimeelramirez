const controller = require('./../app/controller')


const userRoutes = (app) => {
    app.route("/").get((req, res, next) => {
        // middleware
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers",
            "authorization, Origin, X-Requested-With, Content-Type, Accept",
        )
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request body: ${req}`)
        next()
    })
    app.post('/auth/exchange', (req, res) => {
        res.json({ user: 'post endpoint change temp code for access_code' });
    });
    app.post('/auth/login', controller.postUser);
    app.get('/auth/users', controller.getAll);
    //on id
    app.get('/auth/user/:id', controller.getUserId);
}


module.exports = userRoutes