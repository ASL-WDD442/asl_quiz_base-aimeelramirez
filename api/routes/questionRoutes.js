const Questions = require('./../models/questions')



const questionRoutes = (app) => {
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
    app.get("/api/question", (req, res) => {
        console.log('This is question endpoint.')
        res.json({ question: 'question' })
    })
}
module.exports = questionRoutes