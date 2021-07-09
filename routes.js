'use strict';
const path = require('path');

module.exports = function (app) {
    const json = require('./controller');

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    });
    app.route('/news').get(json.getNews);
    app.route('/news/:id').get(json.getNewsId);
}