const { error } = require("../util/script");

const authorize = (req, res, next) => {
    if (req.user) {
        next(); // Authorized
    } else {
        next(error(
            401,
            "Unauthorized"
        ));
    }
}

module.exports = authorize;
