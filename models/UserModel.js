var connPool=require("./ConnPool.js");
var LoginBean = require("../jsbean/LoginBean");    

module.exports={
    resJson:function(res,txt,bool){
        res.json({
            msg:txt,
            success:bool
        })
    },
	register:function(req,res){
        var self=this;
		pool = connPool(); 
        // return new Promise((resolve, reject) => {
            //从pool中获取连接(异步,取到后回调) 
            pool.getConnection(function(err,conn){ 
                var userAddSql = 'insert into user (email,pwd,nickname,createtime) values(?,?,?,current_timestamp)'; 
                var param = [req.body['email'],req.body['pwd'],req.body['nickname']];
                const emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                conn.query(userAddSql,param,function(err,rs){ 
                    if(err){ 
                        errStr = err.message; 
                        if(errStr.indexOf('emailuniq')>-1){ 
                            self.resJson(res,"email重复",false); 
                            return;
                        }else if(errStr.indexOf('nicknameuiq')>-1){ 
                            self.resJson(res,"昵称已经注册了！请换一个吧",false); 
                            return;
                        } 
                        self.resJson(res,"数据库错误,错误原因:"+err.message,false); 
                        return; 
                    };

                    if (emailfilter.test(req.body['email'])==false) {
                        self.resJson(res,"邮箱格式有误",false);
                        return;
                    }
                    // res.redirect(307,'./login');  
                    // req.session.rs = rs
                    loginbean = new LoginBean();    
                    // loginbean.id=req.body.uid;    
                    loginbean.nickname = req.body['nickname'];    
                    req.session.loginbean = loginbean;
                    self.resJson(res,"注册成功！",true); 
                    // res.redirect('/',{msg:"注册成功",success:true});
                    // window.location.reload();
                    // res.redirect('/?email='+req.body['email']+"&pwd="+req.body['pwd']); 
                }) 
                conn.release(); 
            }); 
        // }).then((rs) => {
        //     console.dir(rs);
        //     // if (rs.success) {
        //                             res.redirect('/',{msg:"注册成功",success:true});

        //     // }
        // })
	},
    login:function(req,res){
        var self=this;
        pool = connPool();   
        //从pool中获取连接(异步,取到后回调)   
        pool.getConnection(function(err,conn){ 
            if(err){ 
               //console.log('insert err:',err.message); 
               self.resJson(res,"获取连接错误,错误原因:"+err.message,false); 
               return; 
            } 
            var userSql = 'select uid,nickname from user where email=? and pwd=?';   
            var param = [req.body['email'],req.body['pwd']];   
            conn.query(userSql,param,function(err,rs){   
                if(err){   
                    //console.log('insert err:',err.message);   
                    self.resJson(res,"数据库错误,错误原因:"+err.message,false);   
                    return;   
                }   
                // console.log(rs);   
                //console.log(rs.length);   
                if(rs.length>0){   
                    loginbean = new LoginBean();    
                    loginbean.id=rs[0].uid;    
                    loginbean.nickname = rs[0].nickname;    
                    req.session.loginbean = loginbean;
                    self.resJson(res,"登录成功",true);   
                }else{   
                    self.resJson(res,"email/密码错误",false);   
                }   
            })   
            conn.release();
        });
    }
}
