const request = require('request')

module.exports = {
    /* This method returns a promise */
    getApiCall: function (options) {
        return new Promise((resolve, reject) => {

            function callback(error, response, body) {
                console.log(JSON.parse(body));
                if (body.length > 0) {
                    if (!options.uri) {
                        return self.emit('error', new Error('options.uri is a required argument'))
                    }
                    if (!error) {
                        // const info = JSON.parse(body);
                        // console.log(info);
                        resolve(body)
                    }
                } else {
                    if (error) reject(error)
                }
            }
            request(options, callback);

        })

    }
}