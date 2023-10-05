const mongoose = require("mongoose");

const db = {};

db.connect = (uri) => {
    return mongoose.connect(uri);
};

module.exports = db ;