var express = require('express');
var router = express.Router();
var pubArt = require('../models/pubArt.js');
var page = require("../models/page.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    pubArt.getArtList(req, res);
  	// loginbean = req.session.loginbean;  
  	// var model = {
  	// 	userinfo: loginbean,
  	// 	hasAd: 1,
   //    artList: req.artList
  	// }  
    // model.artList = pubArt.getArt(req, res);
	  // res.render('index',model); 
    // res.send(model.artList);
});
router.get('/logout',function(req,res){ 
	req.session.destroy(function(err) { 
		res.redirect('/'); 
	}) 
}); 
router.get('/article', function(req, res, next) {
 //  	loginbean = req.session.loginbean;    
 //  	var model = {
 //  		userinfo: loginbean,
 //  		hasAd: 0
 //  	}  
	// res.render('article', model); 
  pubArt.getArt(req, res);

});
router.get('/articlelist', function(req, res, next) {
  	loginbean = req.session.loginbean;  
  	var model = {
  		userinfo: loginbean,
  		hasAd: 1
  	}    
	res.render('article-list', model); 
});
router.get('/publishart', function(req, res, next) {
  	loginbean = req.session.loginbean;
  	var model = {
  		userinfo: loginbean,
  		hasAd: 0
  	}      
	res.render('publish-art',model); 
});

router.post('/pubArt', function(req, res, next) {
    loginbean = req.session.loginbean;
    if (!loginbean) {
      res.json({
          msg: "请登录后操作",
          success: false
      })
    }else{
      pubArt.pub(req, res);
    }
  // res.render('publish-art',model); 
});

router.get('/page', function(req, res, next) {
    loginbean = req.session.loginbean;
    page.pageRange(req, res);
  // res.render('publish-art',model); 
});
module.exports = router;
