var connPool=require("./ConnPool.js");
var LoginBean = require("../jsbean/LoginBean"); 
var moment = require('moment'); 

module.exports = {
	pub: function(req, res) {
		var self = this;
		pool = connPool(); 
		//从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            var artAddSql = 'insert into article (title,content,uid,nickname,createtime) values(?,?,?,?,current_timestamp)';
            var param = [req.body['title'],req.body['content'],req.session.loginbean.id,req.session.loginbean.nickname];
            conn.query(artAddSql, param, function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    //res.send("数据库错误,错误原因:"+err.message);
                    console.error(err);
                    res.json({
	                	msg: err.message,
	                	success: false
	                });
                    return;
                }
                //res.send('提问成功');
                // console.dir("22222222222"+rs[0].aid);
                res.json({
                	msg: "提交成功11",
                    // data: rs.aid,
                	success: true
                });
            })
            conn.release();
        });
	},
	getArtList: function(req, res) {
		var self = this;
		pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            }
            var listSql = 'select aid,title,content,createtime,uid,nickname from article order by aid desc';
            var param = [];
            conn.query(listSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    rs.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                //console.log(rs.length);
                // req.artList = rs;
                // res.render('index', {loginbean:loginbean,artList:rs});
                // loginbean = LoginBean();  
                // rs.createtime = moment(rs.createtime).format('yyyy-MM-dd');

                loginbean = req.session.loginbean;
			  	var model = {
			  		userinfo: loginbean,
			  		hasAd: 1,
			      	artList: rs,
                    moment: moment
			  	}  
	  			res.render('index',model); 

            })
            conn.release();
            // return artList;
        });
	},
    getArt: function(req, res) {
        var self = this;
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            }
            var id = req.query["id"];
            var listSql = 'select aid,title,content,createtime from article where aid=?';
            var param = [id];
            conn.query(listSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                //console.log(rs.length);
                // req.artList = rs;
                // res.render('index', {loginbean:loginbean,artList:rs});
                // loginbean = LoginBean();  
                // rs.createtime = moment(rs.createtime).format('yyyy-MM-dd');
                loginbean = req.session.loginbean;
                var model = {
                    userinfo: loginbean,
                    hasAd: 0,
                    art: rs[0],
                    moment: moment
                }  
                res.render('article',model); 

            })
            conn.release();
            // return artList;
        });
    }
}