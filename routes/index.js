var express = require('express');
var router = express.Router();
var pubArt = require('../models/PubArt.js');
var page = require("../models/Page.js");
var moment = require('moment'); 

/* GET home page. */
router.get('/', function(req, res, next) {
    pubArt.getArtList(req, res, 0);
});
// 退出登陆
router.get('/logout',function(req,res){ 
	req.session.destroy(function(err) { 
		res.redirect('/'); 
	}) 
}); 
router.get('/article', function(req, res, next) {
  pubArt.getArt(req, res);

});
router.get('/articlelist', function(req, res, next) {
    pubArt.getArtList(req, res, 1); 
});
router.get('/publishart', function(req, res, next) {
  	loginbean = req.session.loginbean;
  	var model = {
  		userinfo: loginbean,
  		hasAd: 0,
      curMenu: "publishart",
      moment: moment
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
});

router.get('/page', function(req, res, next) {
    loginbean = req.session.loginbean;
    page.pageRange(req, res);
});
module.exports = router;
