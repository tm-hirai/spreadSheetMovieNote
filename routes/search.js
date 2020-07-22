const express = require('express');
const router = express.Router();
const request = require('request');
const fs =require('fs');
const tmdb_api_key = process.env.TMDb_API_KEY;
const authenticationEnsurer = require('./authentication-ensurer');

/* GET home page. */
router.get('/',authenticationEnsurer, function (req, res, next) {
  const title = 'Home';
  console.log(req.query.q);
  if (!req.query.q) {
    const err = new Error('クエリが見つかりません');
    err.status=404;
    return next(err);
  }
  
  const header = {
    'Content-type': 'application/json'
  };
  const data = {
    api_key: tmdb_api_key,
    language: 'ja-JP',
    query: req.query.q,
    page: req.query.p,
    include_adult: 'true'
  };
  const options = {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    headers: header,
    qs: data,
    json: true,
  }

  request.get(options, function (error, response, body) {
    body.q = req.query.q;
    console.log(JSON.stringify(body));
    res.render("search", {title: title,message:body});
  });
});

module.exports = router;
