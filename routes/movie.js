var express = require("express");
var router = express.Router();
const request = require("request");
const fs = require("fs");
const country_code = JSON.parse(fs.readFileSync("country_code.json"));
const tmdb_api_key = process.env.TMDb_API_KEY;
const authenticationEnsurer = require('./authentication-ensurer');

/* GET home page. */
router.get("/:id",authenticationEnsurer, function (req, res, next) {
  const title = "Move";
  console.log(req.params.id);

  const header = {
    "Content-type": "application/json",
  };
  const data = {
    api_key: tmdb_api_key,
    language: "ja-JP",
    query: req.query.q,
    page: req.query.p,
    include_adult: "true",
  };
  const options = {
    baseUrl: "https://api.themoviedb.org/3/movie",
    uri: req.params.id,
    method: "GET",
    headers: header,
    qs: data,
    json: true,
  };

  request.get(options, function (error, response, body) {
    body.q = req.query.q;
    console.log(body);
    let message = body;
    message.q = req.query.q;
    console.log(JSON.stringify(message));
    message.release_date = message.release_date.replace(/-/g, "/");
    message.genres = message.genres.map((e) => e.name).join("/");
    message.production_countries = message.production_countries
      .map((e) => country_code[e.iso_3166_1].companyjp)
      .join("/");
    const dt = new Date();
    const year = dt.getFullYear();
    const month = ("00" + (dt.getMonth()+1)).slice(-2);
    const day = ("00" + dt.getDate()).slice(-2);
    const now_date = `${year}/${month}/${day}`;

    message.date = now_date;

    res.render("movie", {title: title,message:message});
  });
});

router.post("/:id",authenticationEnsurer, function (req, res, next) {
  console.log(req.body);
  // console.log(req.body.toString());
  console.log(req.params.id);
  console.log(req.body.title);
  // res.send('ok');

  const values = [
    req.body.date,
    req.params.id,
    req.body.title,
    req.body.release_date,
    req.body.countries,
    req.body.genres,
    req.body.rating,
    req.body.comment,
  ];
  console.log(values);
  const accessToken = req.user.accessToken;
  const spreadsheetId = "145kSArXLtFk2hv3W_Yrud4cQeeJALtCXldgjauwdKsg";
  const range = "A1";
  const options = {
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    qs: {
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    },
    json: {
      values: [values],
    },
  };
  request.post(options, (error, response, body) => {
    if (error) {
      console.log("Error: " + error.message);
      res.send(error);
      return;
    }
    console.log(body);
    res.send(body);
    console.log("sheet get");
  });
});

module.exports = router;
