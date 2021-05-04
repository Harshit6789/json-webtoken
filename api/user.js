require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/schema');
const validate = require('../validate');
const auth = require("../auth/AuthController");
const secret = process.env.secret;
const jwt = require('jsonwebtoken');

/*sending data */
router.post('/register', validate, auth.authPost, async function (req, res) {

    try {
        const isEmail = await User.findOne({ email: req.body.email });
        if (isEmail) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        Password = await bcrypt.hash(req.body.password, 8);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: Password,
            token: req.body.token
        })

        try {
            const data = await user.save();

            res.status(200).json({
                message: data
            })
        } catch (err) {
            res.json("Error: " + err);
        }
    } catch (err) {
        res.status(400).json({
            error: "something went wrong" + err
        })
    }
});

/*login user */
router.post('/login', async (req, res) => {

    const Email = await User.findOne({ email: req.body.email });

    if (!Email) {
        return res.status(400).json({
            error: "invalid email!!!!!!!"
        });
    }

    const validPass = await bcrypt.compare(req.body.password, Email.password);

    if (!validPass) {
        return res.status(400).json({
            error: "invalid password!!!!!!!"
        })
    } else {
        jwt.sign(req.body, secret, { expiresIn: '1000s' }, (err, token) => {
            res.json({
                id: Email.id,
                Token: token
            })
        })
    }

});

router.get('/home', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            data: {
                message: user
            }
        });
    } catch (err) {
        res.json("Error " + err);
    }
});


/****authorizing users **/
router.post("/dashboard", auth.authGet, (req, res) => {
    res.json("Welcome to the dashboard");
})

module.exports = router;