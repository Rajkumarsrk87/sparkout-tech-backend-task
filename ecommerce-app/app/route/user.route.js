const express = require("express");
const route = express.Router();
const mySQL = require("../dbconfig/dbconfig");
const bcrypt = require('bcrypt');

route.post('/createUser', (req, res) => {
    const password = req.body.confirmPassword

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            const encryptPassword = hashedPassword;

            const users = {
                'name': req.body.name,
                'email': req.body.email,
                'password': encryptPassword,
            }

            const isEmailExistInUser = 'select * from users where email = ?';
            mySQL.query(isEmailExistInUser, users.email, (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    return res.send({ status: 400, message: "This email user is already exist" })
                }

                const insertUser = "INSERT INTO users SET?";
                mySQL.query(insertUser, users, (err, result) => {
                    if (err) throw err;

                    return res.send({ status: 200, message: "User created successfully" })
                });
            });
        })
    })
});
module.exports = route;