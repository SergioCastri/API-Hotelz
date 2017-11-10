var express = require('express');
var ApiHotelz = require('../app/functions.js');
var assert = require('assert');
var app = require('../app.js');
var supertest = require('supertest'),
	chai = require('chai'),
	chatHttp = require('chai-http'),
    should = require('should'),
    assert = require('assert');

var ap = ApiHotelz;

var request = supertest(app);
var expect = chai.expect;

chai.use(chatHttp);

describe('POST /v1/rooms/reserve', function() {
	it('Llenar todos los campos', (done) => {
	chai.request('localhost:3001').send({}).post('/v1/rooms/reserve').end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });;
	});
});

describe('GET /v1/rooms', function() {

    it('should return code 200', function(done) {
        request.get('/v1/rooms')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });
    });

    it('should return code 200', function(done) {
        request.get('/v1/getAll')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done(err);
  			    });
    });

    it('should return a correct message Json Object', function(done) {
        request.get('/v1/rooms')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.message);
  		    		done();
  			    });
    });

    it('should return a correct message Json Object', function(done) {
        request.get('/v1/getAll')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.message);
  		    		done();
  			    });
    });

});