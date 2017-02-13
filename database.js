var mongoClient = require('mongodb').MongoClient

exports.save = function(query,callback){
    var url = process.env.MONGOLAB_URI
    var doc = {
        term : query,
        when : (new Date()).toISOString()
    }

    mongoClient.connect(url,function(err,db){
        if(!err){
            console.log("connected to database")
            var collection = db.collection('querylog')
            collection.insertOne(doc,function(err,result){
                console.log("insert query and time into log")
                db.close()
                callback(null,result)
            })
        } else {
            console.log("connection to database error")
            callback(err)
        }
        
    })
    
}

exports.get = function(callback){
    var url = process.env.MONGOLAB_URI
    mongoClient.connect(url,function(err,db){
        if(!err){
            var collection = db.collection('querylog')
            collection.find({},{_id:0}).sort({when:-1}).limit(10).toArray(function(err,docs){
                if(!err){
                    console.log("retrieve log")
                    db.close()
                    callback(docs)
                } else {
                    console.log("Failed to do collection.find")
                    callback(null)
                }
            })
        } else {
            console.log("Failed to connect to database")
            callback(null)
        }
        
    })
}

//getall()