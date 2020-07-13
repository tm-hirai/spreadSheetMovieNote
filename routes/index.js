var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  const title = 'Home';
  res.render("index", {user:req.user,title: title,max: 5,message:[1,2,3,4,5]});
});

module.exports = router;
