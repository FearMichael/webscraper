const routes = require("express").Router();

routes.get("", function(req, res) {
    res.render({})
});

module.exports = routes;