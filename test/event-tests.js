var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var dbutils = require('../lib/dbutils.js');
var newsFlash6id;
 
describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    dbutils.cleardb(function(){done();});
  });

  //Create tests
  //
  describe('Event', function() {
    it('should successfully create a new event', function(done) {
      var profile = {
        title: 'News flash 6'
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
        title: 'News flash 7'
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
        title: 'News flash 8'
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

    //Read tests
    //
    it('should return three events', function(done) {
    request(url)
	.get('/events')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.lengthOf(3);
          eventsArray = JSON.parse(res.text);
          assert.equal(eventsArray[0].title, 'News flash 6');
          assert.equal(eventsArray[1].title, 'News flash 7');
          assert.equal(eventsArray[2].title, 'News flash 8');
          newsFlash6id = eventsArray[0]._id;
          done();
        });
    });

    it('should return news flash 6 event', function(done) {
    request(url)
	.get('/events/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property('title');
          res.body.title.should.equal('News flash 6');
          done();
        });
    });

    //Update Tests
    //

    it('should successfully update a specific event', function(done) {
      var profile = {
        title: 'News flash 6 - revised'
      };
    request(url)
	.put('/events/'+ newsFlash6id)
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.title.should.equal('News flash 6 - revised')
          done();
        });
    });

    it('should verify revised News flash 6 event', function(done) {
    request(url)
	.get('/events/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property('title');
          res.body.title.should.equal('News flash 6 - revised');
          done();
        });
    });

    //Delete tests
    //
    it('should delete revised News flash 6 event', function(done) {
    request(url)
	.del('/events/'+ newsFlash6id)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });

    it('should now return two events', function(done) {
    request(url)
	.get('/events')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.lengthOf(2);
          eventsArray = JSON.parse(res.text);
          assert.equal(eventsArray[0].title, 'News flash 7');
          assert.equal(eventsArray[1].title, 'News flash 8');
          done();
        });
    });


  });
});