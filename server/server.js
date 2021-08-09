

"use strict"

const https = require('https');
// const fs = require('fs')
const options = require('./config')
const express = require("express");
// let ejs = require('ejs');
const path = require('path');
const router = new express.Router();
const api = require('./apiConfig')




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
    .createServer(options, app, api, (req, res) => {
        res.send(`server is listening at post ${port}.`)
    }).listen(port);