var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
	loginbean = req.session.loginbean;    
	console.log("loginbean:"+loginbean);    
	res.render('index',{userinfo:loginbean}); 
});

router.post('/register', function(req, res, next) {
	// var subflag=req.body['subflag'];
	// console.log(nickname);
	// if(subflag!=undefined){ 
		userModel.register(req,res);
	// }else{
	// 	res.send("表单提交错误！");
	// }
  // res.send(nickname);
  
});
router.all('/login', function(req, res, next) {
	// var subflag=req.body['subflag'];
	// console.log(nickname);
	// if(subflag!=undefined){ 
		userModel.login(req,res);
	// }else{
	// 	res.send("表单提交错误！");
	// }
  // res.send(nickname);
  
});
module.exports = router;
