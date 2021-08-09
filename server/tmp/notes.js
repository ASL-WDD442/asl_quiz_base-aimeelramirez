




// const https = require('https');
// const fs = require('fs')
// const options = require('./config')
// const express = require("express");
// const path = require('path');
// const url = require('url')

// //get api
// const app = express();

// //set port
// const port = 8080

// app.set("port", port);

// // // get the view pages of htmls
// // const viewsPath = path.join(__dirname, './views');
// // const publicPath = path.join(__dirname, './public');
// // //set views
// // app.set('views', viewsPath);
// // app.set('view engine', 'html');

// // //get use views
// // app.use(express.static(viewsPath));
// // //get public path
// // app.use(express.static(publicPath));

// var users = [
//     { name: 'somebody', email: 'somebody@domain.com' },
//     { name: 'ales', email: 'ales@domain.com' },
//     { name: 'aimee', email: 'aimee@domain.com' }
// ];


// //ssl
// https
//     .createServer(options, (req, res) => {

//         console.log(`Your server is running on port ${port}`);
//         // let parsed = url.parseQueryString(req.url)
//         let filename = path.join(__dirname, req.url)
//         console.log(filename)
//         fs.readFile(filename, ((err, data) => {
//             res.end(JSON.stringify(users));
//         }))


//     }).listen(port)
