// Dependencies
const userModel = require("../model/User");

// Module scaffolding
const userService = {};

/**
 * Find by any property from user database
 *
 * @param {String} key
 * @param {any} value
 * @returns {Promise}
 */
userService.findByProp = (key, value) => {
    if (key === "_id") {
        return userModel.findById(value);
    } else {
        return userModel.findOne({ [key]: value });
    }
};

/**
 * Creates an user in the database
 *
 * @param {{name: String, email: String, password: String}} user
 * @returns {Promise}
 */
userService.register = async ({ name, email, password }) => {
    let user;
    user = new userModel({ name, email, password });
    return user.save();
};

// Export module
module.exports = userService;