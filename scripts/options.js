

window.onload = function(){
    if(!localStorage.friends){
        ydgz_RR.api({
            'method': 'friends.getFriends'
            ,'fields': 'headurl_with_logo,tinyurl_with_logo'
        }, function(res){
            if(!res.err_code){
                // localStorage.friends = JSON.stringify(res);
                console.log('[debug]getFrients:'+ res);
                document.getElementById('test').innerHTML = JSON.stringify(res);
            }else{
                console.log('[err]getFrients:'+res.error_msg);
            }
        });
    }
}