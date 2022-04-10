const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

let model = mongoose.model('users', schema);

module.exports = model;