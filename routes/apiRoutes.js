const routes = require("express").Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// A GET route for scraping the echoJS website
routes.get("/scrape", function(req, res) {
  let scrapes = [];
    // First, we grab the body of the html with axios
    axios.get("https://www.reddit.com/r/developer/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      let $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("h2").each(function(i, element) {
        // Save an empty result object
        let result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).text();

        result.link = $(this)
          .parent("a").attr("href");
  
        // result.blurb = $(this)
        //   .siblings("p").text();
          console.log(result);
        // Create a new Article using the `result` object built from scraping
        scrapes.push(result);
      });
    });
    console.log(scrapes);
    res.render("index", scrapes)
  });

routes.post("/comment", function(req, res) {
    console.log(req.body);
    db.Comment.create(req.body).then(function(data) {
        db.Scrape.findOneAndUpdate({_id: req.body.scrape}, {$push: {comment: data._id}}).then(function(data) {
          res.send(data);
        }).catch(function(err) {
          console.log(err)
        })
    }).catch(function(err) {
      console.log(err);
    });
});

module.exports = routes;