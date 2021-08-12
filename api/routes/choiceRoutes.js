const model = require('./../models/choices')

const choiceRoutes = (app) => {
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
    })
    app.get("/api/choice", (req, res) => {
        console.log('This is choice endpoint.')
        res.json({ choice: 'choice' })

    })
}
module.exports = choiceRoutes