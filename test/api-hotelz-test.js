var express = require('express');
var ApiHotelz = require('../app/functions.js');
var assert = require('assert');

var ApiHotelz = ap;

it('Llenar todos los campos', function(){
  var respuesta = ap.saveReserve(req, res);
  assert.equal(respuesta,'se deben llenar todos los campos');
});
