<!-- 登录模版 -->
<%if (islogin==1){%>
	<form class="dialog-box" id="login-form">
		<span class="close-btn j-close-btn">x</span>
		<p>
			<span class="label-name">昵称：</span>
			<span><input type="text" name="nickname" id="" value="<%=nickname%>"></span>
		</p>
		<p>
			<span class="label-name">邮箱：</span>
			<span><input type="text" name="email" id="" value="<%=email%>"></span>
		</p>
		<p>
			<span class="label-name">密码：</span>
			<span><input type="password" name="pwd" id=""></span>
		</p>
		<p class="tc-login-btn-block">
			<span class="j-login-submit login-submit">登陆</span>
			<span class="j-close-btn">取消</span>
		</p>
	</form>
<%}else{%>
	<form class="dialog-box" id="register-form">
		<span class="close-btn j-close-btn">x</span>
		<p>
			<span class="label-name">昵称：</span>
			<span><input type="text" name="nickname" id="" value="<%=nickname%>"></span>
		</p>
		<p>
			<span class="label-name">邮箱：</span>
			<span><input type="text" name="email" id="" value="<%=email%>"></span>
		</p>
		<p>
			<span class="label-name">密码：</span>
			<span><input type="password" name="pwd" id=""></span>
		</p>
		<p class="tc-login-btn-block">
			<span class="j-register-submit login-submit">注册</span>
			<span class="j-close-btn">取消</span>
		</p>
	</form>
<%}%>
<div class="mask-box"></div>