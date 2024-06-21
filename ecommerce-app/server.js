const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const dbConn = require('./app/dbconfig/dbconfig');
const userRoute = require("./app/route/user.route")
const userLoginRoute = require("./app/route/userLogin.route")

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// default route
app.get('/', (req, res) => {
    return res.send({ message: 'Node app is running' })
});

app.use('/', userRoute);
app.use('/', userLoginRoute);

app.listen(3000, () => {
    console.log('Node app is listening on port 3000');
});
module.exports = app;