'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("/Index", res);
};

// menampilkan semua data dari database
exports.getNews = function (req, res) {
    connection.query('SELECT * FROM news', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// tampil berdasarkan id
exports.getNewsId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM news WHERE id = ?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.insertNews = function (req, res) {
    let source = req.body.source;
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let urlToImage = req.body.urlToImage;

    connection.query('INSERT INTO news (source, title, description, url, urlToImage) VALUES(?,?,?,?,?)',
        [source, title, description, url, urlToImage], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Data berhasil ditambahkan', res);
            }
        });
};