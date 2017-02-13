var request = require('request')
var key = 'AIzaSyAfXvJwX98GhiM7zULfOdFERQRvw5gE6Uo'
var cx = '013357017715236086207:lrfmrdgmr9u'

function returnJson (jString) {//reformat received json from google 
    var json = JSON.parse(jString)
    var arrItem = json.items
    var arrRes = []
    arrItem.forEach(function(obj){
        var newObj = {
            url : obj.link,
            snippet : obj.snippet,
            thumbnail : obj.image.thumbnailLink,
            context : obj.image.contextLink 
        }
        arrRes.push(newObj)
    })
    return arrRes
}

exports.get = function(query,offset,callback){
    //var query = 'uemura rina'
    var param = '&fields=items(link,snippet,image(contextLink),image(thumbnailLink))'
    var start = offset ? "&start="+offset : ""
    console.log("---value start: "+start)
    request('https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType=image&q='+query+param+start,function(err,res,body){
        if(!err&&res.statusCode==200){
            callback(null,returnJson(body))
        } else {
            console.log("error "+res.statusCode+" from google ")
            callback(true,null)
        }
    })
}
