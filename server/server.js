const https = require('https');
const express = require('express');
const path = require('path');
const options = require('./../tmp/config');
// running app
const app = require('./app/index')
// set port
const port = 3000;
app.set('port', port);
console.log(`server is listening at post ${port}.`);
const log = require('debug')('server:logging');

// // ssl
https
    .createServer(options, app, () => {
        log(`API listening on port ${port}!`)
    }).listen(port);


// app.listen(port, () => log(`API listening on port ${port}!`))