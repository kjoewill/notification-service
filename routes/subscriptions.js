var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var dbutils = require('../lib/dbutils.js');
var mongoUri = dbutils.mongoUri; 

/*

Subscriptions look like this in JSON

  {
    "eventTitle": "New CLM Build Available",
    "alertEndpoint": "kjoewill@gmail.com",
    "_id": "521a5af259b05b8099000002"
  }

*/


exports.findById = function(req, res) {
  var id = req.params.id;

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
        res.send(item);
        db.close();
      });
    });
  });
}
 
exports.findAll = function(req, res) {

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.find().toArray(function(err, items) {
        res.send(items);
        db.close();
      });
    });
 });
}
 
exports.addSubscription = function(req, res) {
  var subscription = req.body;

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.insert(subscription, {safe:true}, function(err, result) {
        res.send(result[0]);
        db.close();
      });
    });
  });
}
 
exports.updateSubscription = function(req, res) {
  var id = req.params.id;
  var subscription = req.body;

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.update({'_id':new BSON.ObjectID(id)}, subscription, {safe:true}, function(err, result) {
        res.send(subscription);
        db.close();
      });
    });
  });
}
 
exports.deleteSubscription = function(req, res) {
  var id = req.params.id;

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
        res.send(req.body);
        db.close()
      });
    });
  });
}
 
