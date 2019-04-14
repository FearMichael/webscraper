const mongoose = require("mongoose");

htmlRoutes.get("", function(req, res) {
    res.render({})
});

module.exports = htmlRoutes;