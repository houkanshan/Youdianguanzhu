/*===== addListener ======*/

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.isYouDianGuanZhu &&  localStorage.isRequest){
		localStorage.removeItem('isRequest');
		console.log('[debug]token: '+request.token);
		try{
			var params = (function(token){
				if (token == ""){return{};}
				var params = {};
				for(var i = 0; i < token.length; ++i){
					var map = token[i].split('=');
					if(map.length != 2){console.log('[err]map: '+map);continue;}
					params[map[0]] = decodeURIComponent(map[1].replace(/\+/g," "));
				}
				console.log('[debug]params: '+ params);
				return params;

				//sample session:
				//"#access_token=140612%7C6.f9763505d3d5bd01c17e7b911b7b82f1.2592000.1333566000-326358287&expires_in=2592393&scope=read_user_message+write_guestbook+send_request+admin_page+send_message+deal_request+read_user_notification+send_invitation+read_user_badge+publish_blog+create_album+read_user_guestbook+read_user_like_history+email+read_user_invitation+read_user_request+read_user_status+read_user_status+read_user_blog+read_user_feed+read_user_share+read_user_photo+read_user_album+read_user_checkin+read_user_comment+publish_feed+publish_share+publish_checkin+publish_comment+status_update+photo_upload+operate_like"
			})(request.token.substr(1).split('&'));

			var timeExpired = Date.now() + 1000*parseInt(params['expires_in'], 10);

			localStorage.ydgz_rr_token = params['access_token'];
			localStorage.ydgz_rr_token_expire = timeExpired.toString();

			if (localStorage.ydgz_rr_token && localStorage.ydgz_rr_token != 'false'){
				console.log('[info] auth done');
				// chrome.browserAction.setPopup({'popup':'/popup.html'});
				window.open('/options.html');

				// chrome.extension.sendRequest({isLogined:true});
				//window.open(chrome.extension.getURL('')
			}

		}catch(e){
			console.log('[err]catch(e): '+e);
			localStorage.ydgz_rr_token = 'false';
			localStorage.ydgz_rr_token_expire = 0;
		}
		//RenrenChrome will close the window, an extension will be catched
		//test if is ok
		sendResponse({});
	}
	console.log("background run finished");
	return {};
});

//onclick listener
// chrome.browserAction.onClicked.addListener(function(){

// });



/*========== init ==========*/
//check version
var VERSION = "1.0";
//if (!localStorage.ydgz_version || localStorage.ydgz_version != VERSION){
localStorage.clear();
localStorage.ydgz_version = VERSION;
//}

//firstRun
if(!localStorage.firstRun || localStorage.firstRun === 'true'){
	localStorage.firstRun = 'false';
	console.log("init finished");
}
if(ydgz_RR.token()){
	console.log("token succes");
	chrome.browserAction.setPopup({"popup":"/popup.html"});
}else{
	chrome.browserAction.setPopup({"popup":"/login.html"});
}



////check hr page;
//var refreshCnt = 0;
//var isFirst = true;


//function startReq(){
	//var xhr = new XMLHttpRequest();
	//xhr.open("GET", "http://hr.dian.org.cn", false);
	//xhr.onreadystatechange = function(){
		////4为加载完成
		//if(xhr.readyState == 4){
			//refreshCnt++;
			//var stat = xhr.status;
			//console.log('['+refreshCnt+']'+ stat);
			//if(stat == 200){
				//if(isFirst){
					//window.open("http://hr.dian.org.cn");
					////sendOk(stat);
					//isFirst = false;
					////console.log('['+refreshCnt+']'+ stat);
				//}
			//}else{
				//window.open("http://hr.dian.org.cn");
				//if(!isFirst){
					//isFirst = true;
					////sendFailed(stat);
					//console.log('['+refreshCnt+']'+ stat);
				//}
			//}
		//}
	//};
	//xhr.send();
//}

//setInterval(startReq, 2000);
