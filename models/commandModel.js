const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    email: {type: String, required: true},
    cart: {type: Array, required: true},
    date: {type: Date, default: Date.now()}
});

let model = mongoose.model('commands', schema);

module.exports = model;