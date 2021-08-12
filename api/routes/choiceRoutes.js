
const choiceRoutes = (app) => {
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
        .get("/choices", (req, res) => {
            let id = req.query.questionId;
            res.json({ id: id })
            //choices?questionId= 
        })
        .post('/choices', (req, res) => {
            res.json({ choices: 'post endpoint' });
        })
    //on id
    app
        .get('/choices/:id', (req, res) => {
            res.json({ choices: 'get endpoint id' });
        })
        .put('/choices/:id', (req, res) => {
            res.json({ choices: 'put endpoint id' });

        })
        .delete('/choices/:id', (req, res) => {
            res.json({ choices: 'delete endpoint id' });
        })
}
module.exports = choiceRoutes