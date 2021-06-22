'use strict';

module.exports = function (app) {
    const json = require('./controller');

    app.route('/').get(json.index);
    app.route('/news').get(json.getNews);
    app.route('/news/:id').get(json.getNewsId);
    app.route('/news').post(json.insertNews);
}