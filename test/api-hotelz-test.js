var assert = require('assert');
var app = require('../app.js');
var supertest = require('supertest');
var	chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('should');
var assert = require('assert');
var models = require('../app/models.js');

var request = supertest(app);
var expect = chai.expect;

chai.use(chaiHttp);

/*describe('POST /v1/rooms/reserve', function() {
	it('Llenar todos los campos', (done) => {
	chai.request('localhost:3001').send({}).post('/v1/rooms/reserve').end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });;
	});
});*/

describe('GET /v1/rooms', function() {

    it('1. should return code 200 from getRoom function', function(done) {
        request.get('/v1/rooms?arrive_date=2017-12-30&leave_date=2017-12-31&city=05001&hosts=3&room_type=L')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done();
  			    });
    });

    it('2. should return code 200 from getAll function', function(done) {
        request.get('/v1/getAll')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done();
  			    });
    });

    it('3. should return code 200 from getReservations function', function(done) {
        request.get('/v1/reservations')
            .expect(200)
            .end(function(err, res){
              if (err) return done(err);
              done();
            });
    });

    it('4. should return a correct message Json Object', function(done) {
        request.get('/v1/rooms?arrive_date=2017-12-30&leave_date=2017-12-31&city=05001&hosts=3&room_type=L')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.hotel_id);
							should.exist(res.body.hotel_name);
							should.exist(res.body.hotel_thumbnail);
							should.exist(res.body.check_in);
							should.exist(res.body.check_out);
							should.exist(res.body.hotel_website);
							should.exist(res.body.rooms[0].room_type);
							should.exist(res.body.rooms[0].capacity);
							should.exist(res.body.rooms[0].price);
							should.exist(res.body.rooms[0].currency);
							should.exist(res.body.rooms[0].room_thumbnail);
							should.exist(res.body.rooms[0].description);
							should.exist(res.body.rooms[0].beds.simple);
							should.exist(res.body.rooms[0].beds.double);
							should.exist(res.body.hotel_location.address);
							should.exist(res.body.hotel_location.lat);
							should.exist(res.body.hotel_location.long);
  		    		done();
  			    });
    });

    it('5. should return a correct Json Object of getAll', function(done) {
        request.get('/v1/getAll')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body[0].room_type);
							should.exist(res.body[0].hotel_id);
							should.exist(res.body[0].capacity);
							should.exist(res.body[0].rooms_number);
							should.exist(res.body[0].price);
							should.exist(res.body[0].currency);
							should.exist(res.body[0].room_thumbnail);
							should.exist(res.body[0].description);
							should.exist(res.body[0].beds.simple);
							should.exist(res.body[0].beds.double);
  		    		done();
  			    });
          });

  it('6. should return a correct Json Object of getReservations', function(done) {
      request.get('/v1/reservations')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return done(err);
            should.not.exist(err);
            should.exist(res);
            res.body.should.be.an.Object;
            for (var i = 0; i < res.body.length; i++) {
              should.exist(res.body[i].hotel_id);
              should.exist(res.body[i].hotel_name);
              should.exist(res.body[i].hotel_thumbnail);
              should.exist(res.body[i].check_in);
              should.exist(res.body[i].hotel_website);
              should.exist(res.body[i].check_out);
              should.exist(res.body[i].hotel_location.address);
              should.exist(res.body[i].hotel_location.lat);
              should.exist(res.body[i].hotel_location.long);
              for (var j = 0; j < res.body[i].reservation.length; j++) {
                should.exist(res.body[i].reservation[j].state);
                should.exist(res.body[i].reservation[j].arrive_date);
                should.exist(res.body[i].reservation[j].leave_date);
                should.exist(res.body[i].reservation[j].room_type);
                should.exist(res.body[i].reservation[j].capacity);
                should.exist(res.body[i].reservation[j].hotel_id);
                should.exist(res.body[i].reservation[j].beds.simple);
                should.exist(res.body[i].reservation[j].beds.double);
                should.exist(res.body[i].reservation[j].user.doc_type);
                should.exist(res.body[i].reservation[j].user.doc_id);
                should.exist(res.body[i].reservation[j].user.email);
                should.exist(res.body[i].reservation[j].user.phone_number);
              }
            }
            done();
          });
        });
});

describe('DELETE /v1/reservations', function() {
    it('7. should return code 200 from getReservations function', function(done) {
        request.delete('/v1/reservations?reserve_id=5a18a164eafaa3057c1d987d')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done();
              models.close();
  			    });
    });
});
