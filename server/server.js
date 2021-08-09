

"use strict"

const https = require('https');
const options = require('./api/config')
const express = require("express");
/** Future approaches on routing on views
 * const path = require('path');
 * const router = new express.Router();*/
/** Future approaches on API getting on Lyrics Trivia on promises
 * const api = require('./api/apiConfig')*/

//running app
const app = express();
app.use(express.static(__dirname + '/public'));

//set port
const port = 8080
app.set("port", port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

console.log(`server is listening at post ${port}.`);
//ssl
https
    .createServer(options, app, (req, res) => {
        res.send(`server is listening at post ${port}.`)
    }).listen(port);