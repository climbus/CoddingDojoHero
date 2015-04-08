var express = require('express');
var fs = require("fs");

var router = express.Router();
var app = require("../app");

function createDir(name) {
  if(!fs.existsSync(name)){
     fs.mkdirSync(name, 0766, function(err){
       if(err){ 
         console.log(err);
         response.send("ERROR! Can't make the directory! \n");    // echo the result back
       }
     });   
 }
}

/* GET file content. */
router.get('/', function(req, res, next) {
  var fileDir = req.app.get("data_dir");
  
  var fileName = req.query.name;
  var dirName = req.query.dir;
  var fullName;
  
  if (dirName !== undefined) {
    fullName = "public/" + dirName + "/" + fileName;
  } else {
    fullName = fileDir + fileName;
  }
  
  fs.readFile(fullName, function(err, data) {
    res.send(data);  
  });
});

router.post('/', function(req, res, next) {
  var fileDir = req.app.get("data_dir");
  var fileName = req.query.name;
  var dirName = req.query.dir;
  var fullName;

  if (dirName !== undefined) {
    fullName = "public/" + dirName + "/" + fileName;
  } else {
    fullName = fileDir + fileName;
  }

  createDir("public/" + dirName);

  fs.writeFile(fullName, req.body.data, function(err) {
    if (!err) {
        res.send("OK");
    }
  });
});

module.exports = router;