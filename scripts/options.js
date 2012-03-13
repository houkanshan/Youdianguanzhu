putFriend = function(friend){
    getElementById();
}

searchFriends = function(input){
    var text = input.value.replace(/[\(\)\[\]\{\}\?\*\.\+\$\^\\\| ]/g, '');
    if(!text){return;}
    var allFriends = JSON.parse(localStorage.friends);
    var matchFriends = [];
    var reg = new RegExp(text);

    for (var i in allFriends){
        try{
            if (allFriends[i].name.match(text)){
                matchFriends.push(allFriends[i]);
            }
        }catch(e){
            console.log('[err]searchFriends:' + e);
        }
    }
    var out = JSON.stringify(matchFriends);
    console.log(out);
    document.getElementById('test').innerHTML = out;

}

window.onload = function(){
    if(!localStorage.friends){
        ydgz_RR.api({
            'method': 'friends.getFriends'
            ,'fields': 'headurl_with_logo,tinyurl_with_logo'
        }, function(res){
            if(!res.err_code){
                localStorage.friends = JSON.stringify(res);
                console.log('[debug]getFrients:'+ res);
                // document.getElementById('test').innerHTML = JSON.stringify(res);
            }else{
                console.log('[err]getFrients:'+res.error_msg);
            }
        });
    }
}