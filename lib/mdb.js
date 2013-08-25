var mongo = require('mongodb');
 
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

var notesDB = mongo.Db

exports.DB = notesDB;


mongo.Db.connect(mongoUri, function (err, db) {
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    });
  });

  db.collection('mydocs', function(er, collection) {
    collection.find().toArray(function(err, items) {
       console.log ('Content of mydocs', items)
    });
  });

  console.log ('assigning to notesDB');
  notesDB = db;

  console.log ('Here is the Db', notesDB);

});




/*
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    ObjectID = mongo.ObjectID;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('notifierdb', server);
*/


 


/*  DOn't need to initialize db any more


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'notifierdb' database");
        db.collection('events', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Creating DB - since it did not exist - with sample data...");
                populateDB();
                console.log ('Done creating database and initializing with sample data');
            }
        });
    }
});
 







// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    //Events first
    var events = [
    {
        title: "Large meteor strikes moon"
    },
    {
        title: "Leap Year"
    }];
 
    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {});
    });

    //Now subscriptions
    var subscriptions = [
    {
        eventTitle : "Large meteor strikes moon",
        alertEndpoint: "kjoewill@gmail.com"
    }];
 
    db.collection('subscriptions', function(err, collection) {
        collection.insert(subscriptions, {safe:true}, function(err, result) {});
    });
 
};


*/