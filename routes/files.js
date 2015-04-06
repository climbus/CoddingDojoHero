var express = require('express');
var fs = require("fs");

var router = express.Router();

var fileDir = "public/data/";

//var bodyParser = require('body-parser');
//var multer = require('multer');

//router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//router.use(multer()); // for parsing multipart/form-data

/* GET file content. */
router.get('/', function(req, res, next) {
  var fileName = req.query.name;
  
  fs.readFile(fileDir + fileName, function(err, data) {
    res.send(data);  
  });
});

router.post('/', function(req, res, next) {
  var fileName = req.query.name;
  fs.writeFile(fileDir + fileName, req.body.data, function(err) {
    if (!err) {
        res.send("OK");
    }
  });
});

module.exports = router;