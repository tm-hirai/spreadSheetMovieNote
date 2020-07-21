var express = require("express");
var router = express.Router();
const request = require("request");
const fs = require("fs");
const country_code = JSON.parse(fs.readFileSync("country_code.json"));

/* GET home page. */
router.get("/:id", function (req, res, next) {
  const title = "Move";
  console.log(req.params.id);
  // res.send(String())
  const api_key = JSON.parse(fs.readFileSync("tmdb.json", "utf8")).api_key;

  const header = {
    "Content-type": "application/json",
  };
  const data = {
    api_key: api_key,
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

  let testdata = {
    adult: false,
    backdrop_path: "/a4sy6rxTbGjXbOvfpyekvZzNY6Q.jpg",
    belongs_to_collection: {
      id: 645,
      name: "007 シリーズ",
      poster_path: "/HORpg5CSkmeQlAolx3bKMrKgfi.jpg",
      backdrop_path: "/dOSECZImeyZldoq0ObieBE0lwie.jpg",
    },
    budget: 40000000,
    genres: [
      { id: 28, name: "アクション" },
      { id: 12, name: "アドベンチャー" },
      { id: 53, name: "スリラー" },
    ],
    homepage: "http://www.mgm.com/view/movie/1132/The-Living-Daylights/",
    id: 708,
    imdb_id: "tt0093428",
    original_language: "en",
    original_title: "The Living Daylights",
    overview:
      "00メンバーらによるジブラルタルでのNATOの演習訓練中、「スパイに死を」との標札とともに、004が殺害された。訓練に参加していた007ことボンドは暗殺者を追跡。死闘の末に暗殺者を倒す。  その後、ボンドはソ連が支配する東側のチェコスロバキアにいた。ソ連の重要人物コスコフ将軍から、ボンドを名指ししての亡命の協力依頼が英国情報部に入りその任務のために現地へ潜入していた。先に潜入していた同僚のソーンダースとともに、クラシック演奏会場から脱出したコスコフを援護する。",
    popularity: 16.819,
    poster_path: "/e4fYokvNOKuHoqG4bG3gC1u65Ba.jpg",
    production_companies: [
      {
        id: 60,
        logo_path: "/oJXpAs4I3W46e4dkaOEzCa4yBko.png",
        name: "United Artists",
        origin_country: "US",
      },
      {
        id: 7576,
        logo_path: "/oYcUi1byZ312Z3xiz5ojz9RQLND.png",
        name: "Eon Productions",
        origin_country: "GB",
      },
      { id: 10761, logo_path: null, name: "Danjaq", origin_country: "US" },
    ],
    production_countries: [{ iso_3166_1: "GB", name: "United Kingdom" }],
    release_date: "1987-06-29",
    revenue: 191185897,
    runtime: 132,
    spoken_languages: [
      { iso_639_1: "en", name: "English" },
      { iso_639_1: "ar", name: "العربية" },
      { iso_639_1: "fr", name: "Français" },
      { iso_639_1: "de", name: "Deutsch" },
      { iso_639_1: "ru", name: "Pусский" },
      { iso_639_1: "cs", name: "Český" },
      { iso_639_1: "sk", name: "Slovenčina" },
    ],
    status: "Released",
    tagline: "",
    title: "007／リビング・デイライツ",
    video: false,
    vote_average: 6.4,
    vote_count: 934,
  };
  // res.json(testdata);
  let message = testdata;
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

  res.render("movie", { title: title, message: message });

  // request.get(options, function (error, response, body) {
  //   body.q = req.query.q;
  //   console.log(body);
  //   // res.render("movie", {title: title,message:body});
  //   // res.json(body);
  // });
});

router.post("/:id", function (req, res, next) {
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
