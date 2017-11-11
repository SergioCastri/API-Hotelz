var ApiHotelz = require('../app/functions.js');
var assert = require('assert');

var ah = ApiHotelz;

describe('correct params in url', function() {
  /*it('L = l o S = s', function() {
    var res = ah.valiDate(2017-10-30, 2017-10-31, 05001, 3, 'l');
    assert.equal('L y S', res);
  });*/

	it('Actual date validation', function() {
    	var res = ApiHotelz.valiActualDate('2017-11-05');
  		assert.equal('Arrive date should be higher than actual date',res);
  	});
  

});
