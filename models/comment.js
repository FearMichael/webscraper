const mongoose = require("mongoose");
const Schema = mongoose.Schema
const scrape = require("./scrape");

const CommentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    blurb: {
        type: String,
        required: true,
    },
    scrape: {
        type: Schema.Types.ObjectId,
        ref: "Scrape",
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;