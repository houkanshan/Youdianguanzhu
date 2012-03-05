var RR = {
	api_id: "181603",
	api_key: "e708351375cc43409b434c9b8234cdfc",
	URL: {
		api: "http://api.renren.com/restserver.do",
		oauth: "https://graph.renren.com/oauth/authorize",
		redirectUrl: "http://graph.renren.com/oauth/login_success.html"
	},
	token: function() {
					 if (localStorage.rr_access_token 
							 && localStorage.rr_access_token != "false" 
							 && localStorage.rr_access_token != "undefinied" 
							 && localStorage.rr_token_expire 
							 && localStorage.rr_token_expire != 0 
							 && localStorage.rr_token_expire > Date.now()) {
						 return localStorage.rr_access_token;
					 } else {
						 return false;
					 }
				 },
	login: function() {
					 var scopes = ["read_user_status", "read_user_blog", "read_user_feed", "read_user_share", "read_user_photo", "read_user_album", "read_user_checkin", "read_user_comment", "publish_feed", "publish_share", "publish_checkin", "publish_comment", "status_update", "photo_upload", "operate_like"];
					 var scope = "";
					 for (i = 0; i < scopes.length; i++) {
						 if (i == 0) {
							 scope += scopes[i]
						 }
						 scope += " " + scopes[i]
					 }
					 var url = this.URL.oauth + "?client_id=" + this.api_key + "&response_type=token" + "&redirect_uri=" + this.URL.redirectUrl + "&scope=" + scope;
					 var w = 580;
					 var h = 360;
					 var l = (screen.width - w) / 2;
					 var t = (screen.height - h) / 2;
					 var p = 'width=' + w + ', height=' + h + ', top=' + t + ', left=' + l;
					 p += ', toolbar=no, scrollbars=no, menubar=no, location=no, resizable=no';
					 //第二个参数设置页面名称
					 window.open(url, "Renren connection", p);
				 },
	logout: function(callback) {
						//作为需要使用全局变量的东西使用回调
						callback(true);
					},
	api: function(options, callback) {
				 options["access_token"] = this.token();
				 options["format"] = "JSON";
				 options["v"] = "1.0";
				 options["call_id"] = Date.now();
				 var order = [];
				 for (var key in options) {
					 //放了一些数字量进去
					 order.push(key);
				 }
				 order.sort();
				 md5str = "";
				 for (i = 0; i < order.length; i++) {
					 if (order[i] != "upload") {
						 md5str += order[i] + "=" + options[order[i]];
					 }
				 }
				 var sig = MD5(md5str + "99aca85315bf4080b9ebd882863980bc");
				 var url = this.URL.api + "?" + order[0] + "=" + options[order[0]];
				 for (i = 1; i < order.length; i++) {
					 url += "&" + order[i] + "=" + encodeURIComponent(options[order[i]]);
				 }
				 url += "&sig=" + sig;
				 if (document.getElementById("loader")) {
					 document.getElementById("loader").style.display = "block";
				 } else {
					 console.log("Error in getElementByID: 'loader'");
				 }
				 //ajax开始
				 var xhr = new XMLHttpRequest();
				 //url = this.URL.api+'?'
				 xhr.open("POST", url, true);
				 console.log(url);
				 //override
				 xhr.onreadystatechange = function() {
					 if (xhr.readyState == 4) {
						 if (xhr.status == 200) {
							 callback(JSON.parse(xhr.responseText));
							 //if (document.getElementById("loader")) {
							 //document.getElementById("loader").style.display = "none";
							 //}
							 //} else {
							 //console.log("XMLHttpRequest error.");
							 //if (document.getElementById("loader")) {
							 //document.getElementById("loader").style.display = "none";
							 //}
					 }
					 }
				 };
				 xhr.send();
			 }
};

