login = function(){
	if(!ydgz_RR.token()){
		console.log("token failed");
		chrome.browserAction.setPopup({"popup":"login.html"});
		ydgz_RR.login();
	}
}


document.getElementsByTagName('button')[0].onclick = login;
