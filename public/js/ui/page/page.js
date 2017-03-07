define(function(require,exports,module){
	var bt = baidu.template;
	var pageTmpl = require("./page.tpl");
	require("../../../output/js/ui/page/page.css");

	bt.ESCAPE = true;
	var pageBar = function(){
		this.init();
	}
	pageBar.prototype = {
		init: function() {
			this.body = $("body");
			this.artListBox = $(".j-art-list-box");
			this.pageBox = ".j-page-grid";
			this.prevPage = ".j-prev-page";
			this.nextPage = ".j-next-page";
			this.firstPage = ".j-first-page";
			this.lastPage = ".j-last-page";
			this.events();
			// this.getData(1);
		},
		events: function() {
			var self = this;
			self.body.on("click", self.pageBox + " span", function() {
				var curPage = parseInt($(this).text());
				self.getData(curPage);
				self.switchUi(this);
			});
			self.body.on("click", self.firstPage, function() {
				self.getData(1);
			});
			self.body.on("click", self.lastPage, function() {
				self.getData(1);
			});
			self.body.on("click", self.lastPage, function() {
				self.getData(1);
			});
		},
		getData: function(num) {
			var self = this;
			self.artListBox.append("<div class='loading-box'></div>");
			$.ajax({
				url: "/page?id=" + num,
				type: "get",
				dataType: "json",
				success: function(rs) {
					if (rs.success) {
						self.artListBox.html(bt(pageTmpl,{artList:rs.data}));
					}else{
						alert(rs.msg);
					}
				},
				error: function(err) {
					alert(err.msg);
				}
			})
		},
		switchUi: function(ele) {
			if (ele.tagName == "SPAN"){
				$(ele)
					.addClass("cur")
					.siblings("span")
					.removeClass("cur");
			}
		}
	}
	// pageBar.init();
	module.exports = pageBar;
});