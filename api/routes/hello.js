var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.send({
    Output: "Hello World!"
  });
});

router.post("/", function(req, res) {
  res.send({
    Output: "Hello World!"
  });
});

module.exports = router;