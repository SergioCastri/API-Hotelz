var schemas = require('./schemas.js');
var mongoose = require('mongoose');  //mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
var Schema = mongoose.Schema;    //se defina una variable Schema

var url = "mongodb://admin-node:toor@ds227525.mlab.com:27525/hotelznode";

var moon = mongoose.connect(url, {
  useMongoClient: true
});

function close() {
  moon.close();
}

var room_schema = new Schema(schemas.getRoomsSchema());  //Creacion del esquema como tal
var hotel_schema = new Schema(schemas.getHotelSchema());
var reserve_schema = new Schema(schemas.getReservesSchema());
var hotelRes_schema = new Schema(schemas.getHotelResSchema());

var Room = mongoose.model("Room", room_schema);  //creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
var Hotel = mongoose.model("Hotel", hotel_schema);                                          // la que va a mapear
var Reserve = mongoose.model("Reserve", reserve_schema);
var HotelRes = mongoose.model("HotelRes", hotelRes_schema);
 

function getRoom(){
  return Room;
}

function getHotel(){
  return Hotel;
}

function getReserve(){
  return Reserve;
}

function getHotelRes(){
  return HotelRes;
}

module.exports = { // Exporta todos los modelos
  getRoom : getRoom,
  getHotel : getHotel,
  getHotelRes : getHotelRes,
  getReserve : getReserve,
  close: close
};
