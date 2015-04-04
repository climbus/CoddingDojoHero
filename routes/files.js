var express = require('express');
var fs = require("fs");

var router = express.Router();

var fileDir = "data/";

/* GET file content. */
router.get('/', function(req, res, next) {
  var fileName = req.query.name;
  
  fs.readFile(fileDir + fileName, function(err, data) {
    res.send(data);  
  });
});

module.exports = router;