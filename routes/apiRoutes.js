const routes = require("express").Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config()

// A GET route for scraping the echoJS website
routes.get("/scrape", function(req, res) {
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
        db.Scrape.create(result)
          .then(function(dbscrape) {
            // View the added result in the console
            console.log(dbscrape);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
    });
    res.send("Done")
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

routes.post("/testPoint", function(req, res) {
  console.log("---Headers---")
  console.log(req.headers);
  console.log("---Body---")
  console.log(req.body);
  res.send("nailed it")
})

routes.get("/bcsassignments", function(req, res) {
  let data = {
    'enrollmentId': parseInt(process.env.bcsCourseId)
    };
  let headers = {
    'Content-Type': 'application/json', 
    'authToken': process.env.bcsAccess
  };
  // console.log(req.body);
  // res.send("endpoint reached")
  // https://bootcampspot.com/api/instructor/v1/assignments
  axios.post("https://bootcampspot.com/api/instructor/v1/assignments", data, {headers: headers})
    .then(function(assignments) {
      console.log("completed!");
        console.log(assignments.data);
        res.send(assignments.data);
    }).catch(function(err) {
      if (err) {
        console.log(err)
        console.log("---Request--")
        console.log(err.request)
        console.log("---Response---")
        console.log(err.response)
        console.log("problem")
      }   
  });
});

module.exports = routes;