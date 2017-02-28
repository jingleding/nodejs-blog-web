$(".j-login-btn").on("click",function(){
	seajs.use('./js/ui/dialog/dialog',function(Dialog){
		var dialog = new Dialog({
			"islogin": 1
		});
	})
})
$(".j-register-btn").on("click",function(){
	seajs.use('./js/ui/dialog/dialog',function(Dialog){
		var dialog = new Dialog({
			"islogin": 0
		});
	})
})
