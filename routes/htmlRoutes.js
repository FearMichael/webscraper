const routes = require("express").Router();
const db = require("../models");

routes.get("/", function(req, res) {
    // Get all scrapes and send to handlebars
    db.Scrape.find({}).populate("comment").exec(function(err, scrapes) {
        if (err) { console.log(err) }
        console.log("scraping")
        console.log(scrapes);
        res.render("index", {scrapes});
    })
});

// routes.get("/testingApi", function(req, res) {
//     // Get all scrapes and send to handlebars
//     db.Scrape.find({}).populate('comment').exec(function(err, scrapes) {
//         if (err) { console.log(err) }
//         console.log("scraping")
//         console.log(scrapes);
//         res.json({scrapes});
//     })

    // db.Comment.find({}).populate({path: 'comment.scrape', model: "Scrape"}).exec(function(err, comments) {
    //     if (err) { console.log(err) }
    //     console.log("scraping")
    //     console.log(comments);
    //     res.json({comments});
    // })

// });

module.exports = routes;