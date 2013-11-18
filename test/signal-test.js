var should = require('should'); 
var assert = require('assert');
var request = require('supertest'); 
var dbutils = require('../lib/dbutils.js'); 
var newsFlash6id;

/*

Signals look like this:

  {
     "eventTitle": "Large meteor strikes the moon",
     "instancedata": "This one weighed more than 16 megatons!!"
  }

*/

 
describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    dbutils.cleardb(function(){done();});
  });


  //Create events
  //
  describe('Signals', function() {
    it('should successfully create a new event', function(done) {
      var profile = {
        title: 'News flash 100'
      };
    request(url)
	.post('/events')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should successfully create another new event', function(done) {
      var profile = {
        title: 'News flash 101'
      };
    request(url)
	.post('/events')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should successfully create even another new event', function(done) {
      var profile = {
        title: 'News flash 102'
      };
    request(url)
	.post('/events')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    //Create subscriptions 
  
    it('should successfully create a new subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 100',
        alertEndpoint:'kjoewill@gmail.com'
      };
    request(url)
	.post('/subscriptions')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should successfully create another new subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 100',
        alertEndpoint:'kjwillia@us.ibm.com'
      };
    request(url)
	.post('/subscriptions')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should successfully create even another new subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 102',
        alertEndpoint:'kjoewill@gmail.com'
      };
    request(url)
	.post('/subscriptions')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });



    //Signal tests
    //
    it('should signal one event and trigger return two notifications', function(done) {
      var profile = {
        eventTitle: 'News flash 100',
        instancedata: 'An instance of event(News flash 100) has happened'
      };
    request(url)
	.post('/signals')
        .send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.lengthOf(2);
          eventsArray = JSON.parse(res.text);
          assert.equal(eventsArray[0].alertEndpoint, 'kjoewill@gmail.com');
          assert.equal(eventsArray[0].eventTitle, 'News flash 100');
          assert.equal(eventsArray[1].alertEndpoint, 'kjwillia@us.ibm.com');
          assert.equal(eventsArray[1].eventTitle, 'News flash 100');

          done();
        });
    });

    //Event signal log tests
	//
    it('should retreive one log entry', function(done) {
    request(url)
	.get('/signallog')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
		  res.body.should.have.lengthOf(1);
          eventsArray = JSON.parse(res.text);
          assert.equal(eventsArray[0].eventTitle, 'News flash 100');
          done();
        });
    });


  });
});