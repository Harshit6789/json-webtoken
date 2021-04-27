require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.db;

mongoose.connect(url , {useNewUrlParser:true , useUnifiedTopology: true} , (err)=>{
    if(!err) {
        console.log("Connected");
    }else {
        console.log("Error in connecting " + err);
    }
});

app.use(express.json());

const employee = require('./routers/employees');

app.use("/home" , (req , res)=>{
    res.json("Welcome...")
});

app.use("/api" , employee);

app.listen(3111,()=>{
    console.log("Server started");
    
})
