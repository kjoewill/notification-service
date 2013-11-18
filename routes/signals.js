var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var dbutils = require('../lib/dbutils.js');
var mongoUri = dbutils.mongoUri;
 
var mailer = require('../lib/mailer.js');
var _ = require ('underscore');
 
/*

Signals look like this:

  {
     "eventTitle": "Large meteor strikes the moon",
     "instancedata": "This one weighed more than 16 megatons!!"
  }


*/


function processMatch(subscription, signal) {

   opts = {
     from: 'Simple Notification Service <kjwnotificationservice@gmail.com>',
     to: subscription.alertEndpoint,
     subject: subscription.eventTitle + ' happened at: ' + new Date(),
     body: signal.instancedata
   }

   // Send alert
   mailer.sendMail(opts);

}

  
exports.processSignal = function(req, res) {
    var signal = req.body;
    console.log('Processing Signal: ' + JSON.stringify(signal));

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('subscriptions', function(err, collection) {
      collection.find().toArray(function(err, items) {
        matches = _.filter(items, function(sub){return sub.eventTitle == signal.eventTitle});
        _.each(matches, function (sub) {processMatch(sub, signal)});
        res.send(matches);
      });   
    });
  });
  
  // Log reception of the signal
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('signalLog', function(er, collection) {
      collection.insert(signal, {safe:true}, function(err, result) {
        db.close();
      });
    });
  });

}
 
 