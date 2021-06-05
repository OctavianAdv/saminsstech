const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    User: String,
    BirthDay: String,
});

module.exports = mongoose.model("birthday", Schema);