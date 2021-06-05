const { Schema, model } = require("mongoose");

module.exports = module(
    "modlogs",
    new Schema({
        Guild: String,
        Channel: String,
    })
);