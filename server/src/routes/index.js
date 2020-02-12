var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: "success",
    message: "Welcome to express"
  });
});

module.exports = router;
