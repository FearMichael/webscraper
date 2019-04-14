const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    blurb: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = UserSchema;