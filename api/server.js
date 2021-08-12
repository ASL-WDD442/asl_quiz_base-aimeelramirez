
const http = require('http');
const indexRouter = require('./app/index');
const express = require('express')
// running app
const app = express();
// set port
const port = 4000;
app.set('port', port);
indexRouter(app)
// ssl
http.createServer(app, (req, res) => {
    console.log('hello from endpoint!')
    res.send({ message: 'hello' })

}).listen(port);
