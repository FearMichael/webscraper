const routes = require("express").Router();

routes.get("/", function(req, res) {
    res.render("index", {name: "Hello World"})
});

module.exports = routes;