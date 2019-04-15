const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ScrapeSchema = new Schema({
    title: {
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

const Scrape = mongoose.model("Scrape", ScrapeSchema);

module.exports = Scrape;