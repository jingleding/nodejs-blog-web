$(".j-login-btn").on("click",function(){
	seajs.use('./js/ui/dialog/dialog',function(Dialog){
		var dialog = new Dialog({
			"islogin": 1
		});
	})
});
$(".j-register-btn").on("click",function(){
	seajs.use('./js/ui/dialog/dialog',function(Dialog){
		var dialog = new Dialog({
			"islogin": 0
		});
	})
});
// page
seajs.use("ui/page/page.js",function(pageBar){
	var PageBar = new pageBar();
});

// 时间格式化format
seajs.use("ui/format.js", function(Date){
	var Date = new Date();
})