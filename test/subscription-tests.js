var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var dbutils = require('../lib/dbutils.js');
var newsFlash6id;
 
/*

Subscriptions look like this in JSON

  {
    "eventTitle": "New CLM Build Available",
    "alertEndpoint": "kjoewill@gmail.com",
    "_id": "521a5af259b05b8099000002"
  }

*/



describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    dbutils.cleardb(function(){done();});
  });

  //Create tests
  //
  describe('Subscription', function() {
    it('should successfully create a new subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 6',
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
        eventTitle: 'News flash 7',
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

    it('should successfully create even another new subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 8',
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

    //Read tests
    //
    it('should return three subscriptions', function(done) {
    request(url)
	.get('/subscriptions')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.lengthOf(3);
          subsArray = JSON.parse(res.text);
          assert.equal(subsArray[0].eventTitle, 'News flash 6');
          assert.equal(subsArray[0].alertEndpoint, 'kjoewill@gmail.com');
          assert.equal(subsArray[1].eventTitle, 'News flash 7');
          assert.equal(subsArray[1].alertEndpoint, 'kjoewill@gmail.com');
          assert.equal(subsArray[2].eventTitle, 'News flash 8');
          assert.equal(subsArray[2].alertEndpoint, 'kjoewill@gmail.com');

          newsFlash6id = subsArray[0]._id;
          done();
        });
    });

    it('should return news flash 6 subscription', function(done) {
    request(url)
	.get('/subscriptions/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property('eventTitle');
          res.body.eventTitle.should.equal('News flash 6');
          res.body.alertEndpoint.should.equal('kjoewill@gmail.com');
          done();
        });
    });

    //Update Tests
    //

    it('should successfully update a specific subscription', function(done) {
      var profile = {
        eventTitle: 'News flash 8',
        alertEndpoint: 'kjoewill@phonyemail.com'
      };
    request(url)
	.put('/subscriptions/'+ newsFlash6id)
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should verify revised News flash 6 subscription', function(done) {
    request(url)
	.get('/subscriptions/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property('eventTitle');
          res.body.should.have.property('alertEndpoint');
          res.body.eventTitle.should.equal('News flash 8');
          res.body.alertEndpoint.should.equal('kjoewill@phonyemail.com');
          done();
        });
    });

    //Delete tests
    //
    it('should delete revised News flash 6 subscription', function(done) {
    request(url)
	.del('/subscriptions/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should now return two not-deleted subscriptions', function(done) {
    request(url)
	.get('/subscriptions')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.lengthOf(2);
          subsArray = JSON.parse(res.text);
          assert.equal(subsArray[0].eventTitle, 'News flash 7');
          assert.equal(subsArray[0].alertEndpoint, 'kjoewill@gmail.com');
          assert.equal(subsArray[1].eventTitle, 'News flash 8');
          assert.equal(subsArray[1].alertEndpoint, 'kjoewill@gmail.com');
          done();
        });
    });


  });
});