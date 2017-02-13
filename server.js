var express = require('express')
var app = new express()
var api = require('./api.js')

app.get('/',function(req,res){
    res.send("main")
})

app.get('/api/imagesearch/:id',function(req,res){
    console.log("req param: "+req.params.id)
    console.log("offset: "+req.query.offset)
    api.get(req.params.id,req.query.offset,function(err,json){
        if (!err) {
            res.send(json)
        } else {
            res.send("Error 400")
        }
    })
})

app.get('/api/latest/imagesearch',function(req,res){
    res.send("masuk")
})

app.listen(process.env.PORT||8080,function(){
    console.log("image-search server is listening on port "+(process.env.PORT||8080))
})