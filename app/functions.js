var models = require('./models.js');
var schemas = require('./schemas.js');
var json;


function valiDateUrl(arrive_date, leave_date){
  var arrDate = (new Date(arrive_date)).getTime();
  var lveDate = (new Date(leave_date)).getTime();
  var result = lveDate - arrDate;
  if(result <= 0){
    return 'The leave date should be higher than the arrive date';
  }
/*  dates = (new Date(leave_date)).getTime() - (new Date(arrive_date)).getTime(); //recupera el numero de dias en milisegundos que el usuario reservó
  if(dates <= 0) {                                          //Valida que la fecha de salida sea mayor a la de entrada
    res.status(200).send({"message": "La fecha de salida debe ser superior a la de llegada"});
    return 'La fecha de salida debe ser superior a la de llegada';
  }*/
}

function valiCapaUrl(capacity){
  if(capacity>5){
    return 'Capacity Exceeded';
  }
}

function valiCityUrl(city) {
  if(city != 05001 || city != 11001){
    return 'Invalid City';
  }
}

function valiRoomTypeUrl(room_type){
  if(room_type == 'l') {    //validacion para que no incluyan masyusculas ni minusculas en la consulta de la habitacion
    room_type = 'L';
    return 'L';
  }
  if(room_type == 's') {    //validacion para que no incluyan masyusculas ni minusculas en la consulta de la habitacion
    room_type = 'S';
    return 'S';
  }
}

function valiActualDate(arrive_date) {
  var actual = (new Date()).getTime();
  var arrDate = (new Date(arrive_date)).getTime();
  if(actual > arrDate){
    return 'Arrive date should be higher than actual date';
  }
}

/*function valiDateReserve(arrive_date, leave_date){
  if(!(((new Date(req.query.arrive_date)).getTime() >= arrive && (new Date(req.query.arrive_date)).getTime() < leave)       //Compara que la habitacion este disponible para las fechas solicitadas
      || ((new Date(req.query.leave_date)).getTime() > arrive && (new Date(req.query.arrive_date)).getTime() < leave))) {
    return 'Invalid Date'
  }
}*/

function getRooms(req, res){ // función para obtener todos los cuartos disponibles
  valiCityUrl(req.query.city);
  valiCapaUrl(req.query.hosts);
  valiRoomTypeUrl(req.query.room_type);
  Room = models.getRoom();
  Reserve = models.getReserve();
  Hotel = models.getHotel();
	Room.find({hotel_id: req.query.city, room_type: req.query.room_type, capacity: parseInt(req.query.hosts)},  //Busca habitaciones filtrando por
   '-_id -__v -hotel_id', function(err, doc) {                                                                //id del hotel, por tipo de habitaciones
      if(doc.length == 0) {                                                                                   //y por capacidad de esta, ademas de
        res.status(200).send({"message": "No existen habitaciones"});                                         //esto evita que se muestre en el json
        return;                                                                                               //los campos _id,__v y hotel_id
      }
      json = doc;

      valiDateUrl(req.query.arrive_date, req.query.leave_date);
      dates = (new Date(req.query.leave_date)).getTime() - (new Date(req.query.arrive_date)).getTime(); //recupera el numero de dias en milisegundos que el usuario reservó
      dates = parseInt(dates / 86400000);             //recupera el numero de dias que se hospedara el usuario
      json[0].price = json[0].price * dates;  //calcula el precio segun la cantidad de dias que se hospedara ye l precio por dia de la habitacion


      var quantityReserves = [];

      Reserve.find({hotel_id: req.query.city, room_type: req.query.room_type, capacity: parseInt(req.query.hosts)},     //busca las reservaciones existentes
       '-_id -__v',                                                                                               //por room_type, hotel_id, y capacidad
       function(err, doc) {
        for(var i = 0; i < doc.length; i++) {                              //busca las habitaciones que hay disponibles segun la consulta que
          var arrive = (new Date(doc[i].arrive_date)).getTime();           //el susario realizó
          var leave = (new Date(doc[i].leave_date)).getTime();

          if(((new Date(req.query.arrive_date)).getTime() >= arrive && (new Date(req.query.arrive_date)).getTime() < leave)       //Compara que la habitacion este disponible para las fechas solicitadas
              || ((new Date(req.query.leave_date)).getTime() > arrive && (new Date(req.query.arrive_date)).getTime() < leave)) {
            quantityReserves.push(doc[i]);                                                       //Quita el campo cuantityReserves del JSON para evitar mostrarlo
          } else {                                                                    //si la consulta es disponible
            doc[i] = "";
          }
        }

        Hotel.findOne({hotel_id: req.query.city}, '-_id -__v', function(err, doc) {   //Busca los datos del hotel filtrando por codigo de este
          if(doc == null) {                                                                       //muestra en la consulta de la habitacion todos los datos
            res.status(200).jsonp({"message": "No existe el hotel"});
            return;
          }
          if(quantityReserves.length < json[0].rooms_number) {            //se asigna al campo rooms del schema hotel, en un vector de json
            json[0].rooms_number = undefined;                             //las habitaciones diponibles.
            doc.rooms = json;
          }
          res.status(200).send(doc);
        });
      });


  });


};


function getAll(req, res){ // función para obtener todas las habitaciones

  Room.find({}, '-_id -__v', function(err, doc) {
      res.status(200).jsonp(doc);
  });

};


function saveHotel(req, res) { //función para guardar un hotel, Unicamente se guardaron dos (medellin y bogotá)
  var hotel = new Hotel({
    hotel_id: req.body.hotel_id, hotel_name: req.body.hotel_name, hotel_location: {
    address: req.body.hotel_location.address, lat: req.body.hotel_location.lat, long: req.body.hotel_location.long},
    hotel_thumbnail: req.body.hotel_thumbnail, check_in: req.body.check_in,
    check_out: req.body.check_out, hotel_website: req.body.hotel_website});

  hotel.save(function() {
    res.send(hotel);
  });
};

function saveReserve(req, res) { //función para guardar una reserva

  if(req.body.arrive_date == null || req.body.arrive_date == ""           //Validaciones para que para que se llenen todos los campos
    || req.body.leave_date == null || req.body.leave_date == ""
    || req.body.room_type == null || req.body.room_type == ""
    || req.body.capacity == null || req.body.capacity == 0
    || req.body.beds.simple == null || req.body.beds.double == null
    || req.body.hotel_id == null || req.body.hotel_id == ""
    || req.body.user.doc_type == null || req.body.user.doc_type == ""
    || req.body.user.doc_id == null || req.body.user.doc_id == ""
    || req.body.user.email == null || req.body.user.email == ""
    || req.body.user.phone_number == null || req.body.user.phone_number == "") {
    res.status(400).send({"message": "Error llenando los campos"});
    return "se deben llenar todos los campos";
  }

  var reserve = new Reserve({                   //Se crea la variable reserve que es donde se almacenaran los datos en JSON
      arrive_date: req.body.arrive_date,
      leave_date: req.body.leave_date,
      room_type: req.body.room_type,
      capacity: req.body.capacity,
      beds:{
        simple: req.body.beds.simple,
        double: req.body.beds.double
      },
      hotel_id: req.body.hotel_id,
      user: {
        doc_type: req.body.user.doc_type,
        doc_id: req.body.user.doc_id,
        email: req.body.user.email,
        phone_number: req.body.user.phone_number
      }
    });

  var arrive_date_split = reserve.arrive_date.split("-");           //Vector de fecha [YYYY,MM,AA]
  var leave_date_split = reserve.leave_date.split("-");             //Vector de fecha [YYYY,MM,AA]

  if(arrive_date_split.length != 3 || leave_date_split.length != 3) {  //Valida que el formato de la fecha sea correcto
    res.status(400).send({"message": "Error en el formato de las fechas"});
    return;
  }

  if((new Date(reserve.arrive_date)).getTime() >= (new Date(reserve.leave_date)).getTime()) {   //Valida que la fecha de salida se mayor a la de llegada
      res.status(400).send({"message": "La fecha de salida debe ser superior a la de llegada"});
      return;
  }

  var d = new Date();

  var subtraction = ((new Date()).getTime() - (new Date(reserve.arrive_date)).getTime()) - 18000000; //le quito 5 horas UTC colombia est atrasado

  if(subtraction > 86400000) { //verifico si es el mismo día
      res.status(400).send({"message": "La fecha de llegada debe ser igual o mayor a la de hoy"});
      return;
  }

  var rooms = Room.find({}, '-_id -__v', function(err, doc) {
      res.status(200).jsonp(doc);
  });

  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].hotel_id == reserve.hotel_id && rooms[i].room_type == reserve.room_type && rooms[i].capacity == reserve.capacity){
      if(rooms[i].rooms_number <= 0){
        res.status(400).send({"message":"La habitacion no está disponible"});
        return;
      }else{
        rooms[i].rooms_number = rooms[i].rooms_number - 1;
      }
    }
  }

  reserve.save(function(err, doc) {       //Se guarda la reservacion
    if(err) {
      res.status(500).send({"message": "Error en el servidor"});
      return;
    }
    res.status(200).send({"reservation_id": reserve._id});
  });

};

function save(req, res) { //función para guarda la habitacion
  var room = new Room({
    hotel_id: req.body.hotel_id, room_type: req.body.room_type, capacity: req.body.capacity,  rooms_number: req.body.rooms_number,
    price: req.body.price, currency: req.body.currency, room_thumbnail: req.body.room_thumbnail, description: req.body.description,
    beds: {simple: req.body.beds.simple, double: req.body.beds.double}});

  room.save(function() {
    res.send(room);
  });
};

module.exports = { // Exporta todos los metodos
	getAll: getAll,
  getRooms: getRooms,
  save: save,
  saveHotel: saveHotel,
  saveReserve: saveReserve,
  valiDateUrl : valiDateUrl,
  valiCapaUrl : valiCapaUrl,
  valiRoomTypeUrl : valiRoomTypeUrl,
  valiCityUrl : valiCityUrl,
  valiActualDate : valiActualDate
};
