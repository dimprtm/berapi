'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan");
};