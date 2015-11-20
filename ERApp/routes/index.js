var express = require('express');
var router = express.Router();
var redis = require("redis");
que = redis.createClient();

que.on("error", function (err) {
    console.log("Error " + err);
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , dataname: 'Home'});
});
router.post('/data', function(req, res, next) {
	var name = req.body.fname;
	var last = req.body.lname;
	var newname = null;
	que.set("First",name, function(){
		que.get("First",function(err,value){
			newname = value;
			res.render('index', { title: 'DataHome' , dataname:newname });
		})
	});
});
module.exports = router;
