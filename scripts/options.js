putFriend = function(friend){
    getElementById();
};

searchFriends = function(input){
    var text = input.value.replace(/[\(\)\[\]\{\}\?\*\.\+\$\^\\\| ]/g, '');
    if(!text){return;}
    var allFriends = JSON.parse(localStorage.friends);
    var matchFriends = [];
    var reg = new RegExp(text);

    var ul = document.getElementById('friend_list').getElementsByTagName('ul')[0];
    ul.innerHTML = "";
    for (var i in allFriends){
        try{
            if (allFriends[i].name.match(text)){
                matchFriends.push(allFriends[i]);
            }
        }catch(e){
            console.log('[err]searchFriends:' + e);
        }
    }
    // var out = JSON.stringify(matchFriends);
    for(var j in matchFriends){
        var li =
        '<li>'+
            '<a class="head" href="#">'+
                '<img class="head" src="'+
                matchFriends[j].tinyurl+
                '" alt="head">'+
            '</a>'+
            '<a class="name" href="#">'+
            matchFriends[j].name+
            '</a>'+
        '</li>';
        ul.innerHTML += li;
        console.log(li);
    }

};

window.onload = function(){
    if(!localStorage.friends){
        ydgz_RR.api({
            'method': 'friends.getFriends',
            'fields': 'headurl_with_logo,tinyurl_with_logo'
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
};