var models = require('./models.js');
var schemas = require('./schemas.js');
var admin = require("firebase-admin");
var validations = require('./validations.js');


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "gohotels-5a589",
    private_key_id: "f535730ce6fbf8ae5ef37388d2efc02edc017c7f",
    client_email: "firebase-adminsdk-4ho08@gohotels-5a589.iam.gserviceaccount.com",
    client_id: "109587161632761692215",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4ho08%40gohotels-5a589.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCavZnRBlZ0cMyM\n6B1Kw+FjeF87zPkOFcmMKa3+jPlhK1DAiUMeX+KCHqW+yvBhogr6JNBst6V3bGTU\ngkapSJ1aCb2wHmsBKBkCmY2VmjrzEZCiuI4tUJz5m0xsz7xgrQbY9cO+x7WNNkPR\n7oyaAQiR+m3s260Bmge79V7Xw3cDcjkKHajhV1lZ04q0zyYi6q36/YRN1NEalf87\nxspXxGVUqWfNG7iDhsERBVWxRCM0k4y87xKIQZYcZXjjr0GJM+7Kqn224kevsusW\noQF32Zcw7QgZX/yiLWlmXmCt4MBxOef5fYUfmnNfMgEXKrorZVAOPzRHm/IQjAO3\n6obt1PQLAgMBAAECggEAOs5XSFKKRJIhimMjzqgGXdD/EDDjbXDmOXgVgal9lGnr\ntF/1u/Ngl2aiQpHJLLFyToHzG33nSi1NXF1uESNheTg+eFH3BGeCqbRFVFdak8lX\nGB/fGGWMYmeccbW4t1zKP2WW0EgBPPskZwGrOVOvOBrd76fEZdltmway1niYIByO\np3Qs9ihNo20aeYPxRwb7m7suRE663qfCS04tiM786RkkXJ1cc7uxdvZb+0I/tOqe\nBn4DJMwngmjssrGJh4jtrd06F3vu4KLhOmufXBKLcw2j1tkGuCQYEg9ZFQ4rSsv6\nP3Zgh/lAP/KJzXOm+E/weW/QCY+PULzqYKuUrXjkUQKBgQDZV/trC/AuwSj6vluw\n6YMQXT6gdu5xLUc35SFzURnberghkfl5cL3CnoLxB5gTfdsbXuBmA8moplu4YERo\ndr/gPcCpSZgEvwwNQEaEzvBM7gDyZM63QytNKtZjFGC7QVc58qyHO7Y3C+t9J9cP\nhXXPXfrHnbk0mCen1Sr8/DRzNwKBgQC2QzK0Iy3Fw/5QVN3K6uoQ1R5wuU7F6wT3\n3QDkvOa2ay3h/wGsM2h3Eh41My1wZz4eBEiBW/+U/0txFXl7gTteLmb2ZpvUQPN8\nJ/+Qdam2Fqv1GLFylc499ynjXUZfwKhOkHYrcQpI72Zm/YRXiRBTGU/mna3GiHHl\nDFtJoTtXzQKBgQDV8Ow0eCDp9QugnsblA0cXUaH3FHsr/vTuyWY+/CMmz8r2iJl4\n+AhizeN43Q/OiAGpFKBw6uOTVoZMnL5Z0iKX2lGOkjnI2kJDvPRtgMI8B7/42lA9\nRyoVoMg96W46hVwWV5GK4LVBxEL/BLuGtMm94PWdjt0jL29Bnuzc8Gm0ywKBgEVZ\nPCmeWQQuls0p/VoAGB9fd72cRIS576H/zR87YO13ynV6+b/zr4PeuO+1EUz7e38g\nUhYmUxD2MlZMvXRor5YeQb7vO8t/CyXqcisdGf3WkocnZh0bMuYQ7Tc9flFglKmP\n/eZ5lFg7/tKhE4Ha/QMhVm2BAWXQ9MUZ9oIFfvbhAoGBAIozmlAm+X8tiRm9uhZr\njOl6NnJDOlwuUnSp3Yuuk257IJL5dYiXdbisF2ze0Tlm5Foz1nI9K1kPHe7d5qMA\nPKrr9R/5L8Kai8r2r3V6l+4jFXuxmWAeMvc4lAgXdMKDEkm/9INl+SY6orcnNfDY\nrSDByfrpFabeV3VBKUCIp9ol\n-----END PRIVATE KEY-----\n"
  })
});

var json, json1;


Room = models.getRoom();
Reserve = models.getReserve();
Hotel = models.getHotel();
HotelRes = models.getHotelRes();

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
        var actual = (new Date()).getTime();
        for (let i = 0; i < doc.length; i++) {
          var valistateres = validations.valiStateReservationDate(doc[i].leave_date)
          if(valistateres){
            doc[i].state = 'D';
            doc[i].save(function() {
            })
          }
          var valicitystatus = validations.valiCitystatus1(doc[i].hotel_id);
          if(valicitystatus){
            json.reservation[j] = doc[i];
            j++;
          }
        }
        j=0
        for (let i = 0; i < doc.length; i++) {
          var valiStateResDate = validations.valiStateReservationDate(doc[i].leave_date);
          if(valiStateResDate){
            doc[i].state = 'D';
            doc[i].save(function() {
            })
          }
          var valicitystatus2 = validations.valiCitystatus2(doc[i].hotel_id);
          if(valicitystatus2){
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
  Reserve.findOne({_id : req.query.reserve_id}, '-__v', function(err, doc) {
    if(err) {
        res.status(500).send({"message": "No existe esa reservación"});
    }else{
      doc.state = 'C';
      doc.save(function() {
        res.status(200).send({"message": "Su reserva fue cancelada exitosamente!!"});
      })
    }
  });
};

function getRooms(req, res){ // función para obtener todos los cuartos disponibles
  var myMessageCity = validations.valiCityUrl(req.query.city);
  if(myMessageCity){
    res.status(400).send({"message": "No existe hotel en esa ciudad"});
  }
  var myMessageCapa = validations.valiCapaUrl(req.query.hosts);
  if(myMessageCapa){
    res.status(400).send({"message": "no puede haber mas de 5 personas por habitacion"});
  }
  var myMessageRt = validations.valiRoomTypeUrl(req.query.room_type);
  if(myMessageRt){
    res.status(400).send({"message": "no existe ese tipo de habitación"});
  }

	Room.find({hotel_id: req.query.city, room_type: req.query.room_type, capacity: parseInt(req.query.hosts)},  //Busca habitaciones filtrando por
   '-_id -__v -hotel_id', function(err, doc) {                                                                //id del hotel, por tipo de habitaciones
      if(doc.length == 0) {                                                                                   //y por capacidad de esta, ademas de
        res.status(200).send({"message": "No existen habitaciones"});                                         //esto evita que se muestre en el json
        return;                                                                                               //los campos _id,__v y hotel_id
      }
      json = doc;
      var myMessageDataUrl = validations.valiDateUrl(req.query.arrive_date, req.query.leave_date);
      if(myMessageDataUrl){
        res.status(400).send({"message": "fecha de llegada deber mayor a la de salida"});
      }

      dates = (new Date(req.query.leave_date)).getTime() - (new Date(req.query.arrive_date)).getTime(); //recupera el numero de dias en milisegundos que el usuario reservó
      dates = parseInt(dates / 86400000);             //recupera el numero de dias que se hospedara el usuario
      json[0].price = json[0].price * dates;  //calcula el precio segun la cantidad de dias que se hospedara ye l precio por dia de la habitacion

      var quantityReserves = [];

      Reserve.find({hotel_id: req.query.city, room_type: req.query.room_type, capacity: parseInt(req.query.hosts)},     //busca las reservaciones existentes
       '-_id -__v',                                                                                               //por room_type, hotel_id, y capacidad
       function(err, doc) {
         for(var i = 0; i < doc.length; i++) {
             var valiDateAvaliable = validations.valiAvaliableDate(doc[i].arrive_date, doc[i].leave_date, req.query.arrive_date, req.query.leave_date);                           //busca las habitaciones que hay disponibles segun la consulta que
             console.log(valiDateAvaliable);
             if (valiDateAvaliable){
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



  let myMessage = validations.valiFormatDate(reserve.arrive_date, reserve.leave_date);
  if(myMessage){
    res.status(400).send({"message": "Error en el formato de las fechas"});
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

/*function saveRoom(req, res) { //función para guarda la habitacion
  var room = new Room({
    hotel_id: req.body.hotel_id, room_type: req.body.room_type, capacity: req.body.capacity,  rooms_number: req.body.rooms_number,
    price: req.body.price, currency: req.body.currency, room_thumbnail: req.body.room_thumbnail, description: req.body.description,
    beds: {simple: req.body.beds.simple, double: req.body.beds.double}});

  room.save(function() {
    res.send(room);
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
*/

module.exports = { // Exporta todos los metodos
	getAll: getAll,
  getRooms: getRooms,
  //saveRoom: saveRoom,
  //saveHotel: saveHotel,
  //saveHotelRes: saveHotelRes,
  saveReserve: saveReserve,
  getReservations : getReservations,
  deleteReservations: deleteReservations
};
