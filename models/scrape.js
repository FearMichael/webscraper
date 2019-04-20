const mongoose = require("mongoose");
const Schema = mongoose.Schema
const comment = require("./comment")

const ScrapeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }]
});

const Scrape = mongoose.model("Scrape", ScrapeSchema);

module.exports = Scrape