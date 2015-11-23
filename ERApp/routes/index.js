var express = require('express');
var router = express.Router();
var redis = require("redis");
var expiredkey = null;
que = redis.createClient();
que.config("SET","notify-keyspace-events", "KEA");
lis = redis.createClient();
lis.on("pmessage",function(pattern,channel,expiredkey){
		console.log("key has "+expiredkey+" expired");
	})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , dataname: 'Home'});
});
router.post('/data', function(req, res, next) {
	var name = req.body.fname;
	var last = req.body.lname;
	var newname = null;
	que.set('string key', name);
	que.expire('string key',2);
	//que.quit();
	
});
lis.psubscribe("__keyevent@0__:expired");
module.exports = router;
