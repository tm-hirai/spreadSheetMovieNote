var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  const title = 'Home';
  res.render("index", {title: title});
});

module.exports = router;
