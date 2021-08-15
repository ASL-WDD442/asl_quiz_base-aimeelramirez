//npm install debug express morgan body-parser uuid morgan-debug
//set up logger
const log = require('debug')('api:logging')
// create express app
const app = require('./app')
// set port to one passed from env variable or 4000
const port = process.env.PORT || 4000
// start server and log port its running on
app.listen(port, () => log(`API listening on port ${port}!`))