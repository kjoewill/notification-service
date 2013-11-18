var mongo = require('mongodb');
var dbutils = require('../lib/dbutils.js');
var mongoUri = dbutils.mongoUri;

exports.findRecent = function(req, res) {

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('signalLog', function(er, collection) {
      collection.find().sort({_id:-1}).limit(5).toArray(function(err, items) {
        res.send(items);
        db.close();
      });
    });
  });
}
 