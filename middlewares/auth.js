const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                err: "authorization header not found"
            })
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                err: "token not found"
            })
        }
        const decode = jwt.verify(token, "SECRET MESSAGE")
        const user = await User.findOne({
            where: {
                id:decode.user.id
            }
        })
        if (!user) {
            return res.status(404).json({
                err: "user not found"
            })

        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}

const isSeller = async (req, res, next) => {
    
    if (req.user.dataValues.isSeller) {
        next();
    } else {
        return res.status(401).json({
            err: "you are not seller"
        })
    }
   
}

module.exports = {isAuthenticated, isSeller}