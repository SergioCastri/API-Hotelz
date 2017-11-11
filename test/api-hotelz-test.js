var express = require('express');
var ApiHotelz = require('../app/functions.js');
var assert = require('assert');
var app = require('../app.js');
var supertest = require('supertest');
var	chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('should');
var assert = require('assert');


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

var ah = ApiHotelz;

describe('correct params in url', function() {
  it('S = s', function() {
    var res = ApiHotelz.valiRoomTypeUrl('s');
    assert.equal('S', res);
  });

  it('L = l', function() {
    var res = ApiHotelz.valiRoomTypeUrl('l');
    assert.equal('L', res);
  });
  it('Capacity > 5', function() {
    var res = ApiHotelz.valiCapaUrl(6);
    assert.equal('Capacity Exceeded', res);
  });
  it('City Validation', function() {
    var res = ApiHotelz.valiCityUrl(11191);
    assert.equal('Invalid City',res);
  });
  it('Leave > Arrive', function() {
    var res = ApiHotelz.valiDateUrl('2017-11-28', '2017-11-27');
    assert.equal('The leave date should be higher than the arrive date',res);
  });
  it('Actual date validation', function() {
    var res = ApiHotelz.valiActualDate('2017-11-05');
  assert.equal('Arrive date should be higher than actual date',res);
  })
  /*it('Already a reserve exists', function() {
    var res = ApiHotelz.valiDateReserve('')
  })*/

/*]  it('date_leave > date_arrive', function() {
    var res = ApiHotelz.valiDate(2017-10-30, 2017-10-29, 05001, 3, 'L');
    assert.equal('La fecha de salida debe ser superior a la de llegada', res);
  });*/


});

describe('GET /v1/rooms', function() {

    it('1. should return code 200 from getRoom function', function(done) {
        request.get('/v1/rooms?arrive_date=2017-10-30&leave_date=2017-10-31&city=05001&hosts=3&room_type=L')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });
    });

    it('2. should return code 200 from getAll function', function(done) {
        request.get('/v1/getAll')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });
    });

    it('3. should return a correct message Json Object', function(done) {
        request.get('/v1/rooms?arrive_date=2017-10-30&leave_date=2017-10-31&city=05001&hosts=3&room_type=L')
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

    it('4. should return a correct Json Object of getAll', function(done) {
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

});
