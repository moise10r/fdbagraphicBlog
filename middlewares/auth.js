const jwt = require('jsonwebtoken');
const {User} = require('../models/users');
const dotenv = require('dotenv')
const mongoose = require('mongoose')


//config Dotenv
dotenv.config({ path: './config/config.env' });

exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token') || req.body.token || req.query.token

    if (!token) return res.status(400).json({ success: false, message: "token incorrect " })
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {

        if (err) return res.status(400).json({ success: false, message: "token est invalide." })

        req.user = decoded
        next()

    })
}

