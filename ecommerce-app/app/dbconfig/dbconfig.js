const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce'
});

// connect to database
dbConn.connect((err) => {
    if (err) throw err;
    console.log("database created successfully");
});

module.exports = dbConn;