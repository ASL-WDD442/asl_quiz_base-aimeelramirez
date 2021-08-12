
// const authUser = require('./../app/controller');
const controller = require('./../app/controller');

const quizRoutes = (app) => {
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
    })
    app
        .get('/quizzes/public', (req, res) => {
            let token = req.headers['authorization']
            console.log(token)
            res.json({ quizzes: 'get endpoint public' });
        })
        .post('/quizzes', (req, res) => {
            res.json({ quizzes: 'post endpoint' });
        })

    //on id
    app.get('/quizzes/:id', (req, res) => {
        res.json({ quizzes: 'get endpoint id' });
    })
        .put('/quizzes/:id', (req, res) => {
            res.json({ quizzes: 'put endpoint id' });

        })
        .delete('/quizzes/:id', (req, res) => {
            res.json({ quizzes: 'delete endpoint id' });
        })
}
module.exports = quizRoutes