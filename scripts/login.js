login = function(){
	if(!ydgz_RR.token()){
		console.log("token failed");
		chrome.browserAction.setPopup({"popup":"login.html"});
		ydgz_RR.login();
	}
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    alert('get request');
    if(request.isLogined){
        alert('logined, send from login.js');
    }
});

document.getElementsByTagName('button')[0].onclick = login;
