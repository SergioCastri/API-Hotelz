var hotelSchemaJSON = { //estructura del esquema, en formato json, excelente para node porque json surge de js y node esta basado en js
  hotel_id : String,
  hotel_name: String,
  hotel_location: {
    address: String,
    lat: String,
    long: String
  },
  hotel_thumbnail: String,
  check_in: String,
  check_out: String,
  hotel_website: String,
  rooms: [{}]
}

function getHotelSchema(){
  return hotelSchemaJSON;
}

var roomsSchemaJSON = { //estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
  hotel_id: String,
  room_type: String,
  capacity: Number,
  rooms_number: Number,
  price: Number,
  currency: String,
  room_thumbnail: String,
  description: String,
  beds:{
    simple: Number,
    double: Number
  }
}

function getRoomsSchema(){
  return roomsSchemaJSON;
}

var reserveSchemaJSON = { //estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
  state: String,
  arrive_date: String,
  leave_date: String,
  room_type: String,
  capacity: Number,
  beds:{
    simple: Number,
    double: Number
  },
  hotel_id: String,
  user: {
    doc_type: String,
    doc_id: String,
    email: String,
    phone_number: String
  }
}

function getReservesSchema(){
  return reserveSchemaJSON;
}

module.exports = { // Exporta todos los metodos
	getHotelSchema : getHotelSchema,
  getRoomsSchema : getRoomsSchema,
  getReservesSchema : getReservesSchema
};
