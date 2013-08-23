var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    ObjectID = mongo.ObjectID;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('notifierdb', server);

exports.DB = db;
 
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
 

 
/*--------------------------------------------------------------------------------------------------------------------*/
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