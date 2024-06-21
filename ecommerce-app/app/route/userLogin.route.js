const express = require("express");
const route = express.Router();
const mySQL = require("../dbconfig/dbconfig.js");
const bcrypt = require('bcrypt');

route.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const isUserExist = 'select email, password from users where email = ?';
    mySQL.query(isUserExist, email, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            Object.keys(result).forEach((resp) => {
                const row = result[resp];
                const createdPassword = row.password;
                const email = row.email;

                if (!bcrypt.compareSync(req.body.password, createdPassword)) {
                    return res.send({ status: 401, message: 'Invalid credentials' })
                }

                const getUserDetails = 'select name, email from users where email = ?';
                mySQL.query(getUserDetails, email, (err, result) => {
                    if (err) throw err;

                    return res.send(result);
                });
            });
        } else {
            return res.send({ status: 404, message: 'User not registered' });
        }
    });
});
module.exports = route;