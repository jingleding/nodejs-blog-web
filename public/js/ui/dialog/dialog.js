define(function(require,exports,module){
	var bt = baidu.template;
	var dialogTmpl = require("./dialog.tpl");
	bt.ESCAPE = true;
	require("./dialog.css");
	var Dialog = function(opts){
		this.init(opts);
	}
	Dialog.prototype = {
		init: function(opts){
			this.islogin = opts.islogin;
			this.render(opts);
		},
		render: function(opts){
			var self = this;
			self.domstr = bt(dialogTmpl,opts);
			$("body").append(self.domstr);
			$(".dialog-box").show();
			self.dom = $(".dialog-box");
			self.maskBox = $(".mask-box");
			self.events();
		},
		events: function(){
			var self = this;
			self.closeEle = self.dom.find(".j-close-btn");
			self.closeEle.on("click",function(){
				self.dom.remove();
				self.maskBox.remove();
			})
			self.resEle = self.islogin!=1 ? self.dom.find(".j-register-submit") : self.dom.find(".j-login-submit");
			self.resEle.on("click",function(){
				self.postSubmit();
			})
		},
		postSubmit: function(){
			var self = this;
			var url=self.islogin==1 ? "/users/login" : "/users/register";
			$.ajax({
				url: url,
				type: "post",
				data: self.dom.serialize(),
				success:function(json){
					if (json.success) {
						if(self.islogin==1){
							$(".j-l-r-block").html("<span>"+self.dom.find("input[name=nickname]").val()+"</span>");
						};
						alert(json.msg);
						self.dom.remove();
						self.maskBox.remove();
						window.location.reload();
					}else{
						alert(json.msg);
					}
				},
				error:function(json){
					alert(json.msg);
				}
			})
		}
	};
	module.exports = Dialog;
})