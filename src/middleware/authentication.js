const jwt = require('jsonwebtoken');
require("dotenv").config();
const { error } = require("../util/script");

const authenticate = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return next(error(
            401,
            "Unauthorized in auth"
        ));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(error(
                401,
                "Unauthorized in auth"
            ));
        }
        // If authentication is successful, store user data in req.user
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;
