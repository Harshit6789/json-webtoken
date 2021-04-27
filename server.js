const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
let config = require('./config');
let middleware = require('./middleware');
const bodyParser = require('body-parser');

class HandlerGenerator {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = 'admin';
        let mockedPassword = 'password';
        if (username && password) {
            if (username == mockedUsername && password == mockedPassword) {
                let token = jwt.sign({ username: username }, config.secret, { expiresIn: '24hr' }/*expires in 24 hours)*/);
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }

        } else {
            res.send(400).json({
                success: false,
                message: 'Authntication failed!please check the request'
            });
        }
    }
    index(req, res) {
        res.json({
            success: true,
            message: "Index pages"
        });
    }

}

function main() {
    require("dotenv").config();
    const app = express();
    //connect to the database 
    const url = process.env.db;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (!err) {
            console.log("Database is connected....");
        } else {
            console.log("Database is not connected" + err);
        }
    });
    let handler = new HandlerGenerator();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    // Routes & Handlers
    app.post("/login", handler.login);
    app.get("/", middleware.checkToken, handler.index);
    const port = process.env.port || 5500;
    app.listen(port, () => {
        console.log(`Server is connecting ${port}`);

    })
}
main();