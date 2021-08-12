const Questions = require('./../models/questions')



const questionRoutes = (app) => {
    app.route("/").get((req, res, next) => {
        // middleware
        res.header("Access-Control-Allow-Origin", "*")
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, X-Requested-With, Content-Type, Accept",
        )
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request body: ${req}`)

        next()
        //example to pass auth in
    })
    app
        .get("/questions", (req, res) => {
            let id = req.query.quizId;
            res.json({ id: id })
            //choices?questionId= 
        })
        .post('/questions', (req, res) => {
            res.json({ questions: 'post endpoint' });
        })

    //on id
    app.get('/questions/:id', (req, res) => {
        res.json({ questions: 'get endpoint id' });
    })
        .put('/questions/:id', (req, res) => {
            res.json({ questions: 'put endpoint id' });

        })
        .delete('/questions/:id', (req, res) => {
            res.json({ questions: 'delete endpoint id' });
        })
}
module.exports = questionRoutes