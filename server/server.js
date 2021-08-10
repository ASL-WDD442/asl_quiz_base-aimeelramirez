const https = require('https');
const express = require('express');
const path = require('path');
const options = require('./api/config');
// running app
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
// set port
const port = 8080;
app.set('port', port);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(`server is listening at post ${port}.`);
// ssl
https.createServer(options, app, () => {
}).listen(port);
