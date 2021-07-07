const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller untuk register user
exports.register = function (req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    };

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("user baru berhasil ditambahkan!", res);
                    }
                });
            } else {
                response.ok("Email sudah tetrdaftar!", res);
            }
        }
    });
};

// controller untuk login
exports.login = function (req, res) {
    let post = {
        email: req.body.email,
        password: req.body.password
    };

    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "password", md5(post.password), "email", post.email];
    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                let token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 86400
                });
                id_user = rows[0].id;
                username = rows[0].username;
                role = rows[0].role;

                let expired = 86400;

                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                };

                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT dibuat",
                            token: token,
                            expires: expired,
                            currUser: data.id_user,
                            user: username,
                            role: role
                        });
                    }
                });
            } else {
                res.json({
                    "Error": true,
                    "Message": "Email atau Password salah!"
                });
            }
        }
    });
};

// menampilkan respon semua data
exports.getNewsWithAuth = function (req, res) {
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

// tambah data
exports.insertNews = function (req, res) {
    let source = req.body.source;
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let urlToImage = req.body.urlToImage;
    let publishedAt = req.body.publishedAt;

    connection.query('INSERT INTO news (source, title, description, url, urlToImage, publishedAt) VALUES(?,?,?,?,?,?)',
        [source, title, description, url, urlToImage, publishedAt], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Data berhasil ditambahkan', res);
            }
        });
};

// ubah data
exports.updateNews = function (req, res) {
    let id = req.body.id;
    let source = req.body.source;
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let urlToImage = req.body.urlToImage;
    let publishedAt = req.body.publishedAt;

    connection.query('UPDATE news SET source=?, title=?, description=?, url=?, urlToImage=?, publishedAt=? WHERE id=?',
        [source, title, description, url, urlToImage, publishedAt, id], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Data ' + id + ' berhasil diubah', res);
            }
        });
};

// menghapus data berdasarkan id
exports.deleteNews = function (req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM news WHERE id=?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok('Data ' + id + ' berhasil dihapus', res);
        }
    });
};