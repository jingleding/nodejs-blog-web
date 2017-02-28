var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  	loginbean = req.session.loginbean;    
	res.render('index',{userinfo:loginbean}); 
});
router.get('/logout',function(req,res){ 
	req.session.destroy(function(err) { 
		res.redirect('/'); 
	}) 
}); 
router.get('/article', function(req, res, next) {
  	loginbean = req.session.loginbean;    
	res.render('index',{userinfo:loginbean}); 
});
module.exports = router;
