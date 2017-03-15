var mysql=require("mysql");
module.exports = (function(){
	var pool=mysql.createPool({
		host:'localhost',
		user:'root',
		password:'ngjcltj5yr',
		database:'blog',
		port:'3306'
	});
	// console.log("pool"+pool);
	pool.on('connection', function(connection) {  
        connection.query('SET SESSION auto_increment_increment=1'); 
        this.flag=false; 
    });
	return function(){ //返回的唯一的一个pool 
        return pool; 
    }; 
})();