// 文章相关业务
var art = {
	init: function() {
		this.body = $("body");
		this.events();
	},
	events: function() {
		var self = this;
		self.body.on("click", ".j-pub-submit", function() {
			var data = $("#pub-form").serialize();
			$.ajax({
				url: "/pubArt",
				type: "post",
				dataType: "json",
				data: data,
				success: function(rs) {
					if (rs.success) {
						alert(rs.msg);
						window.location.href = "/articlelist";
					}else{
						alert(rs.msg);
					}
				},
				error: function(err) {
					alert(err.msg);
				}
			})
		})
	}
}
art.init();