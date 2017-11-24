function valiCapaUrl(capacity){
  if(capacity>5){
    return 'Capacity Exceeded';
  }
}

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

function valiFormatDate(arrive_date, leave_date){
  var arrive_date_split = arrive_date.split("-");           //Vector de fecha [YYYY,MM,AA]
  var leave_date_split = leave_date.split("-");
  if(arrive_date_split.length != 3 || leave_date_split.length != 3) {  //Valida que el formato de la fecha sea correcto
    return "Error in the format of date";
  }
}

module.exports = { // Exporta todos los metodos
  valiCapaUrl : valiCapaUrl,
  valiDateUrl : valiDateUrl,
  valiCityUrl : valiCityUrl,
  valiRoomTypeUrl : valiRoomTypeUrl,
  valiActualDate : valiActualDate,
  valiFormatDate : valiFormatDate
};
