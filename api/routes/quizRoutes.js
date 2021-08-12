
const Quizzes = require('./../models/quizzes')

const quizRoutes = (app) => {
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

    app.get("/api/quiz", (req, res) => {
        console.log('This is quiz endpoint.')
        res.json({ quiz: 'quiz' })

    })
}
module.exports = quizRoutes