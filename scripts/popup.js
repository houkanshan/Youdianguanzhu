window.onload = function(){
	ydgz_RR.api({"method":"users.getLoggedInUser"}, function(res){
		if(!res.error_code){
			localStorage.userId = res.uid;
			console.log('[debug]uid:'+res.uid);
			ydgz_RR.api({
				'method':'users.getInfo',
				'uids': localStorage.userId
			}, function(res){
				if(!res.error_code){
					localStorage.userInfo = JSON.stringify(res[0]);
					console.log('[debug]userInfo:'+localStorage.userInfo);
					document.getElementById('test').innerHTML = localStorage.userInfo + '('+localStorage.uid+')';
				}else{
					console.log("[err]getInfo:"+res.error_msg);
				}
			});
		}else{
			console.log("[err]getLoggedInUser:"+ res.error_msg);
		}
	});
}