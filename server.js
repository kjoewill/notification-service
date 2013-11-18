var express = require('express');
var event = require('./routes/events');
var sub = require('./routes/subscriptions');
var signal = require('./routes/signals');
var signallog = require('./routes/signallog');

//var port = (process.env.PORT || 3000);
var port = (process.env.VCAP_APP_PORT || 3000);

var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
console.log ('registering event routes with express');
app.get('/events', event.findAll);
app.get('/events/:id', event.findById);
app.post('/events', event.addEvent);
app.put('/events/:id', event.updateEvent);
app.delete('/events/:id', event.deleteEvent);
 
console.log ('registering subscription routes with express');
app.get('/subscriptions', sub.findAll);
app.get('/subscriptions/:id', sub.findById);
app.post('/subscriptions', sub.addSubscription);
app.put('/subscriptions/:id', sub.updateSubscription);
app.delete('/subscriptions/:id', sub.deleteSubscription);

console.log ('registering signal routes with express');
app.post('/signals', signal.processSignal);

console.log ('registering log routes with express');
app.get('/signallog', signallog.findRecent);

console.log ('About to start listening');
app.listen(port);
console.log('Listening on port: ', port);