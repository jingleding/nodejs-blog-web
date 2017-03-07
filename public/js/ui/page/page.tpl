

<%if (artList){%>
	<%for (var i= 0; i < artList.length; i++){%>
		<div class="art-list">
			<h1><%=artList[i].title%></h1>
			<div class="art-content">
				<%=artList[i].content%>
			</div>	
			<p class="more-link"><a href="/article?id=<%=artList[i].aid%>" target="_blank">查看全文 ></a></p>
			<p class="detail-text">
				<span>发布时间：<%= (new Date(artList[i].createtime)).Format('YYYY-MM-DD hh:mm:ss') %></span>
				<!-- <span>发布时间：<%= moment(artList[i].createtime).format('YYYY-MM-DD HH:mm:ss')%></span> -->
				<span>作者：<%=artList[i].nickname%></span>
			</p>
		</div>

	<%}%>
<%}%>