const routes = require("express").Router();
const db = require("../models");

routes.get("/", function(req, res) {
    // Get all scrapes and send to handlebars
    db.Scrape.find({}).then(function(scrapes) {
        console.log("scraping")
        console.log(scrapes);
        res.render("index", {scrapes});
    })
});

module.exports = routes;