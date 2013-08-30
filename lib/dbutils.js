var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||'mongodb://localhost/mydb';
 

exports.cleardb = function(doneit) {

   mongo.Db.connect(mongoUri, function (err, db) {
     if (err) {return console.dir(err);}
     db.collection('events', function(err, collection) {
       if (err) {return console.dir(err);}
       collection.remove({},{w:1}, function(err, result) {
         if (err) {return console.dir(err);}
         db.collection('subscriptions', function(er, collection) {
           if (err) {return console.dir(err);}
           collection.remove({},{w:1}, function(err, result) {
             if (err) {return console.dir(err);}
             console.log('Event and Subscription records deleted');
             db.close();
             doneit();
           }); 
         }); 
       });    
     });
   });

}
