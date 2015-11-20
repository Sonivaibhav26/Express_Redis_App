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
	que.set('string key', name, redis.print);
	que.expire('string key', 40);
	var timer = setInterval(function(){
    que.get("string key", function (err, reply) {
       	if(reply){
    		 console.log('I live: ' + reply.toString());
    		}
    	else {
    		clearTimeout(timer);
                newname = 'Died';
                console.log('I Expired:');
                que.quit();
    	}
    	//res.render('index', { title: 'DataHome' , dataname:newname ,});
    });
	},1000);
});
module.exports = router;
