var ApiHotelz = require('../app/functions.js');
var assert = require('assert');

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
