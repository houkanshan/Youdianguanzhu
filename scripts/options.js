putFriend = function(friend){
    getElementById();
};

searchFriends = function(input){
    var text = input.value.replace(/[\(\)\[\]\{\}\?\*\.\+\$\^\\\| ]/g, '');
    var ul = document.getElementById('friend_list').getElementsByTagName('ul')[0];
    ul.innerHTML = "";
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
    // var out = JSON.stringify(matchFriends);
    for(var j in matchFriends){
        var thisFriend = matchFriends[j];
        var li =
        '<li class="clear">'+
            '<a href="javascript:" onClick="" data-id="'+thisFriend.id+'">'+
                '<img class="head" src="'+
                thisFriend.tinyurl+
                '" alt="head">'+
                '<span class="name" href="#">'+
                thisFriend.name+
                '</span>'+
            '</a>'+
        '</li>';
        ul.innerHTML += li;
        // console.log(li);
    }

};

setYou = function(){
    localStorage.yourId = this.getAttribute("data-id");
    if (localStorage && localStorage !== ""){
        
    }
};

window.onload = function(){
    document.getElementById('friend_list').style.maxHeight = (window.screen.availHeight - 200)+'px';
    if(!localStorage.friends){
        ydgz_RR.api({
            'method': 'friends.getFriends',
            'fields': 'headurl_with_logo,tinyurl_with_logo'
        }, function(res){
            if(!res.err_code){
                localStorage.friends = JSON.stringify(res);
                console.log('[debug]getFrients:'+ res);
            }else{
                console.log('[err]getFrients:'+res.error_msg);
            }
        });
    }
};