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
			this.max = $(this.lastPage).data("max");
			this.events();
			// this.getData(1);
		},
		events: function() {
			var self = this;
			self.body.on("click", self.pageBox + " span", function() {
				var curPage = parseInt($(this).text());
				self.getData(curPage);
				self.switchUi($(this));
			});
			self.body.on("click", self.firstPage, function() {
				self.getData(1);
				self.switchUi($(self.pageBox + " span").eq(0));
			});
			self.body.on("click", self.lastPage, function() {
				self.getData(self.max);
				self.switchUi($(self.pageBox + " span").eq(self.max-1));
			});
			self.body.on("click", self.prevPage, function() {
				if (!$(this).hasClass("no-handle")) {
					var num = $(".j-page-grid span.cur").text();
					if (num > 1) {
						num = num-1;
						self.getData(num);
						self.switchUi($(".j-page-grid span.cur").prev());
					}
				}
			});
			self.body.on("click", self.nextPage, function() {
				if (!$(this).hasClass("no-handle")) {
					var num = $(".j-page-grid span.cur").text();
					if (num < self.max) {
						num = num+1;
						self.getData(num);
						self.switchUi($(".j-page-grid span.cur").next());
					}
				}
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
			var self = this;
			ele
				.addClass("cur")
				.siblings("span")
				.removeClass("cur");
			// 当前页为第一页的时候上一步按钮制灰
			if (ele.text() == 1) {
				$(self.prevPage).addClass("no-handle");
			}else{
				$(self.prevPage).removeClass("no-handle");
			}
			// 当前页为最后一页的时候下一步按钮制灰
			if (ele.text() == self.max) {
				$(self.nextPage).addClass("no-handle");
			}else{
				$(self.nextPage).removeClass("no-handle");
			}
		}
	}
	// pageBar.init();
	module.exports = pageBar;
});