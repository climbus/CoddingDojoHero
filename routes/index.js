var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Coding Dojo Hero', 
    data_dir: req.app.get("data_dir"), 
    iframe_src: req.app.get("data_dir_web") + "SpecRunner.html"
  });
});

module.exports = router;
