//npm install debug express morgan body-parser uuid morgan-debug
//set up logger
const log = require('debug')('api:logging')
const https = require('https');
const options = require('./../tmp/config');
// create express app
const app = require('./app')
// set port to one passed from env variable or 4000
const port = process.env.PORT || 4000
// start server and log port its running on
// // ssl
// const server = https.createServer(options, app);
// server.listen(port, () => {
//     log(`Server listening on port ${port}!`)

// });


app.listen(port, () => log(`API listening on port ${port}!`))