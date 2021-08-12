const Users = require('./../models/index')


const userRoutes = (app) => {
    app.route("/").get((req, res, next) => {
        // middleware
        res.header("Access-Control-Allow-Origin", "*")
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
        )
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request body: ${req}`)

        next()
        //example to pass auth in
    })

    app.get("/api/user", (req, res) => {
        console.log('This is user endpoint.')
        res.json({ user: 'user' })

    })
}
module.exports = userRoutes