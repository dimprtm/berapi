let connection = require('../koneksi');
let mysql = require('mysql');
let md5 = require('MD5');
let response = require('../res');
let jet = require('jsonwebtoken');
let config = require('../config/secret');
let ip = require('ip');

// controller untuk register user
exports.register = function (req, res) {
    let post = {
        usernam: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role = req.body.role,
        tanggal_daftar = new Date()
    };

    let query = "SELECT email FROM ?? WHERE ??";
    let table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                let query = "INSERT INTO ?? WHERE ?";
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
                response.ok("Email sudah tetrdaftar!");
            }
        }
    });
};