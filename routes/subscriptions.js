var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||'mongodb://localhost/mydb';
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving subscription: ' + id);
    db.collection('subscriptions', function(err, collection) {
        collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {

  mongo.Db.connect(mongoUri, function (err, db) {

    db.collection('subscriptions', function(err, collection) {
      collection.find().toArray(function(err, items) {
        res.send(items);
      });
    });
 });
}
 
exports.addSubscription = function(req, res) {
  var subscription = req.body;
  console.log('Adding subscription: ' + JSON.stringify(subscription));

  mongo.Db.connect(mongoUri, function (err, db) {

    db.collection('subscriptions', function(err, collection) {
      collection.insert(subscription, {safe:true}, function(err, result) {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          console.log('Success: ' + JSON.stringify(result[0]));
          res.send(result[0]);
        }
      });
    });
  });

}
 
exports.updateSubscription = function(req, res) {
    var id = req.params.id;
    var subscription = req.body;
    console.log('Updating subscription: ' + id);
    console.log(JSON.stringify(subscription));
    db.collection('subscriptions', function(err, collection) {
        collection.update({'_id':new ObjectID(id)}, subscription, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating subscription: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(subscription);
            }
        });
    });
}
 
exports.deleteSubscription = function(req, res) {
    var id = req.params.id;
    console.log ('creating ObjectID');
    newId = new ObjectID(id);
    console.log ('Here it is: ', newId);
    console.log('Deleting subscription: ' + id);
    db.collection('subscriptions', function(err, collection) {
        collection.remove({'_id':new ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
