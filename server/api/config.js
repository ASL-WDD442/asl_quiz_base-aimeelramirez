const fs = require('fs');

const options = {
    key: fs.readFileSync(__dirname + '/tmp/key.pem'),
    cert: fs.readFileSync(__dirname + '/tmp/cert.pem')
};

module.exports = options