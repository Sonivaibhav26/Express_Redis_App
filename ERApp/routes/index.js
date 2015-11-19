var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , dataname: 'Home'});
});
router.post('/data', function(req, res, next) {
	var name = req.body.fname;
  res.render('index', { title: 'DataHome' , dataname:name});
});
module.exports = router;
