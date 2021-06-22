'use strict';

const response = require('./res.js');
const connection = require('./koneksi.js');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan");
};