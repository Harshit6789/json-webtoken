require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const url = process.env.db;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("db is Connected.....");
    } else {
        console.log("Error in connecting " + err);
    }
});

app.use(cors("http://localhost:3000"));
app.use(express.json());

const users = require('./api/user');

app.use("/api", users);

app.listen(4000, () => {
    console.log("Server started.....");

})
