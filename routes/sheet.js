var express = require('express');
var router = express.Router();
const request = require('request');
const { google } = require('googleapis');

/* GET home page. */
router.get('/', function (req, res, next) {
  const accessToken = req.user.accessToken;
  const spreadsheetId = '145kSArXLtFk2hv3W_Yrud4cQeeJALtCXldgjauwdKsg';
  const range = 'A1:D5';
  const options = {
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type':'application/json'
    },
  }
  request.get(options,(error,response,body)=>{
    if (error) {
      console.log('Error: ' + error.message);
      res.send(error);
      return;
    }
    console.log(body);
    res.send(body);
    console.log('sheet get')
  })

  
  // const title = 'Home';
  // res.render("index", {title: title,max: 5,message:[1,2,3,4,5]});
});
router.post('/', function (req, res, next) {
//   const title = 'Home';
//   res.render("index", {title: title,max: 5,message:[1,2,3,4,5]});
    res.send(req.body);
});

module.exports = router;
