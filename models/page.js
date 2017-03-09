// 分页逻辑
var connPool=require("./ConnPool.js");
var LoginBean = require("./LoginBean.js"); 
var async = require('async'); 

module.exports = {
	pageRange: function(req,res) {
		pool = connPool();
	    //从pool中获取连接(异步,取到后回调)
	    pool.getConnection(function(err,conn){
	        if(err){
	            //console.log('insert err:',err.message);
	            res.send("获取连接错误,错误原因:"+err.message);
	            return;
	        }
	        page = 1;
	        if(req.query['id']!=undefined){
	            page = parseInt(req.query['id']);
	            if(page<1){
	                page=1;
	            }
	        }
	        pageSize = 3;
	        pointStart = (page-1)*pageSize;
	        count=0;
	        countPage=0;
	        var countSql = 'select count(*) as count from article';
	        var listSql = 'select aid,title,content,uid,nickname,createtime from article order by aid desc limit ?,?';
	        var param = [pointStart,pageSize];

	        async.series({
	            one: function(callback){
	                conn.query(countSql,[],function(err,rs){
	                    count=rs[0]["count"];
	                    countPage = Math.ceil(count/pageSize);
	                    if(page>countPage){
	                        page=countPage;
	                        pointStart = (page-1)*pageSize;
	                        param = [pointStart,pageSize];
	                    }
	                    callback(null, rs);
	                })
	            },
	            two: function(callback){
	                conn.query(listSql,param,function(err,rs){
	                    callback(null, rs);
	                })
	            }
	        },function(err, results) {

	            rs = results['two'];
                loginbean = req.session.loginbean;
	            res.json({
	            	success: true,
	            	userinfo: loginbean,
	            	page: page,
	            	data: rs,
	            	count: count,
	            	countPage: countPage
	            });
	            //res.send('查完');
	        });
	        conn.release();
	    });
	} 
}