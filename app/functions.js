var models = require('./models.js');
var schemas = require('./schemas.js');
var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "apihotelznode",
    clientEmail: "firebase-adminsdk-7nrk2@apihotelznode.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYtCt9eO6yFu9c\nSRpN8/8B1+or7ESvridGXlHCimYKm0LrhsbltusBr175WwqaEEbNoNo25JzqqVfp\nflGxAgvvZx51vWX5ugzqG/ruCG2E4LFuu5f6Neq1SFM34w76FgN4nQthQZdv/isE\n8ooF6LRAU26KvMQColW18RAUhPEcZW10ZAXGN+FPDBn0DGEYkN6kRtJ+f/ZDRDnW\ncXRtv7dVnP+D5/koRhS8MsIH8YQmrpO/Ce8k9WnODRzgrf6+eGpY1I2OjGdvczvY\nKimB51RNszxdGJ8pwKc3eTyTzeDldnKkhHO/Bt0ydsIFLvHUXeJv1miCooo3Yo7X\nqrjBLid1AgMBAAECggEACrNM0XTa/nwPmi7kPQn/Dcl/qecQVjIYhOBBPm9Z42IF\nb36tIWiDRAbzlDGuEpZFVL/W/pkSdCuOqHwruac9onbk+WXehvKsUr61HjNYKxSd\nlkzuOnVBRMMl6XoirMUmVeU/9lpdiV1oz4/6skN/wQxi8Tf/IBfWznWGjdN/BLVD\nKU9nm7M8xTA5hbQw0R2wrors+IVJZJ7AFaj3Bjs4r9h0WsaFr5j9WQEtlYoi7m+8\nd6SrNsIcYG54a51DrqmYsCMqpultYSTK73ZA+b4pQ7C8OPbV15QjcHoFM6yOQayJ\ngHMTmqC7nOJgxXBSN6WSIIyEy36AbxpQtlFAJkx9IQKBgQDywGQDWG0Qav899+RQ\nVtbjxDHiJUBRtQbCoWR+q1t3Zf0WhdFVv5citaUIy2wQS+n4jf/CPGa9CVH2TIjF\nR/14UuK3BgkG5WUJQtkWOgXrz+0Cmhoe8G5v97kCVrV+W+NYWrdUkSNcEUNXOKQC\nNqVaBLuRj9CbaAbty7YUlIyEFQKBgQDkh9pBTFkvscVa/D0RJdZKTsPfNMrcITfM\nwaQvyg8Oku6PgoMBkHX3M3cSaCbUGnno1seri9mcx1qNQr+bSR28Lae7ArqO6SSP\nIfSpkQFIEZt844kxRjywv/EkQ6QON2yTjiakM/Je8G53L/KgqztqRn4gPASCIIyU\nHzA7ZFUN4QKBgQC4+dd8IR6CezXh74pfmbyHtNHaJE6dtFbhaoAccdDx65puViwM\nrkCpZ0bJq9C9nks8Zl/0j3guJfL5vpod0lyYGni9xHCOe7CA3Rp08GPgrAFLkUfE\nOau90EN/P7lu/u//PKkkXLBYEKOCzBtVwHRBYwfWxILOWPemrisiBYwJfQKBgQCL\n11HH2VdN5yNUDLu1jYi2icI0CJMF5tHFWs0EbUmPanvOl1dhEqwM65I2UkNIUTc+\nMoeWQoqT9C1F+Y1UEYa/itRzjDTqlGHJsEaNqGy3VAbogjeGTmt+4MVHoph2FpY7\nKKYenqb2T3vZNR7sEDvYSXCOewtrMU20qe0Sus+NIQKBgCae6Sjj+KFPKPHIbyU4\nKfBGVjcwASVCgLNsSQGgXenwJklkVWhkEbkEdXz/HAlyhzNuKttQSUQSG2qR+cOj\nKTnNmGA3JAcgjU6KqnWja9H2al6K1s4APgvDdvKz68/tPPqD3t3cM6Bb9+ThVQdg\nZocXfJhfg+xHn0Zs3ir32S1P\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: "https://apihotelznode.firebaseio.com"
});

var json, json1;


Room = models.getRoom();
Reserve = models.getReserve();
Hotel = models.getHotel();
HotelRes = models.getHotelRes();

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

function signInWithGoogle(){
  var idToken = req.header.Authorization;
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    admin.auth().getUser(uid)
      .then(function(userRecord) {
        console.log("Successfully fetched user data:", userRecord.toJSON());
        return userRecord.toJSON();
      })
      .catch(function(error) {
        console.log("Error fetching user data:", error);
      });
  }).catch(function(error) {
    res.status(400).send({"message": "Token invalido"});
  });
}



function getReservations(req, res){
  //fbjson = signInWithGoogle();
  //var emailUser = fbjson.email;
  // var array[];
  var j=0;
  var email = "camigomez35@gmail.com";
  var jsonRes;
  HotelRes.find({}, '-_id -__v', function(err, doc) {   //Busca los datos del hotel filtrando por codigo de este
    if(doc == null) {                                                                       //muestra en la consulta de la habitacion todos los datos
      res.status(200).jsonp({"message": "No existe el hotel"});
      return;
    }else{
      jsonRes = doc;
      json1 = doc[1];  // Bog 
      json = doc[0];   // Med
      Reserve.find({ 'user.email': email }, '-__v', function(err, doc) {   
                    for (let i = 0; i < doc.length; i++) {
            if(doc[i].hotel_id == '05001'){
              json.reservation[j] = doc[i];
              j++;
            }
          }
          j=0
          for (let i = 0; i < doc.length; i++) {
            if(doc[i].hotel_id == '11001'){
              json1.reservation[j] = doc[i];
              j++;
            }
          }
        jsonRes[0] = json;
        jsonRes[1] = json1;
        res.status(200).send(jsonRes); 
      });
    }
  });
};


function deleteReservations(req, res) { 
  Reserve.findOneAndRemove({_id : req.query.reserve_id}, '-__v', function(err, doc) {
    if(err) {
        res.status(500).send({"message": "No existe esa reservación"});
    }else{
       res.status(200).send({"message": "No existe esa reservación"});
    }
  });
};

function getRooms(req, res){ // función para obtener todos los cuartos disponibles
  valiCityUrl(req.query.city);
  valiCapaUrl(req.query.hosts);
  valiRoomTypeUrl(req.query.room_type);
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

function saveHotelRes(req, res) { //función para guardar un hotel, Unicamente se guardaron dos (medellin y bogotá)
  var hotelRes = new HotelRes({
    hotel_id: req.body.hotel_id, hotel_name: req.body.hotel_name, hotel_location: {
    address: req.body.hotel_location.address, lat: req.body.hotel_location.lat, long: req.body.hotel_location.long},
    hotel_thumbnail: req.body.hotel_thumbnail, check_in: req.body.check_in,
    check_out: req.body.check_out, hotel_website: req.body.hotel_website});

  hotelRes.save(function() {
    res.send(hotelRes);
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
      state: "A",
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

  var rooms = [];

   Room.find({hotel_id: reserve.hotel_id, room_type: reserve.room_type, capacity: parseInt(reserve.capacity)}, '-_id -__v', function(err, doc) {

      rooms = doc;

      var quantityReserves = [];

      Reserve.find({hotel_id: reserve.hotel_id, room_type: reserve.room_type, capacity: parseInt(reserve.capacity)},     //busca las reservaciones existentes
       '-_id -__v',                                                                                               //por room_type, hotel_id, y capacidad
       function(err, doc) {

        for(var i = 0; i < doc.length; i++) {                              //busca las habitaciones que hay disponibles segun la consulta que
          var arrive = (new Date(doc[i].arrive_date)).getTime();           //el susario realizó
          var leave = (new Date(doc[i].leave_date)).getTime();

          if(((new Date(reserve.arrive_date)).getTime() >= arrive && (new Date(reserve.arrive_date)).getTime() < leave)       //Compara que la habitacion este disponible para las fechas solicitadas
              || ((new Date(reserve.leave_date)).getTime() > arrive && (new Date(reserve.arrive_date)).getTime() < leave)) {
            quantityReserves.push(doc[i]);                                                       //Quita el campo cuantityReserves del JSON para evitar mostrarlo
          } else {                                                                    //si la consulta es disponible
            doc[i] = "";
          }
        }

        if(quantityReserves.length >= rooms[0].rooms_number) {     
            res.status(400).send({"message": "La habitación no se encuentra disponible en ese rango de fechas"});
            return;
        }

        reserve.save(function(err, doc) {       //Se guarda la reservacion
          if(err) {
            res.status(500).send({"message": "Error en el servidor"});
            return;
          }        
          res.status(200).send({"reservation_id": reserve._id});
        });

    });
  });


};

function saveRoom(req, res) { //función para guarda la habitacion
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
  saveRoom: saveRoom,
  saveHotel: saveHotel,
  saveHotelRes: saveHotelRes,
  saveReserve: saveReserve,
  valiDateUrl : valiDateUrl,
  valiCapaUrl : valiCapaUrl,
  valiRoomTypeUrl : valiRoomTypeUrl,
  valiCityUrl : valiCityUrl,
  valiActualDate : valiActualDate,
  getReservations : getReservations,
  deleteReservations: deleteReservations
};
