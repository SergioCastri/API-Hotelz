var express = require('express'); //libreria de express
var bodyParser = require('body-parser'); //Para manejar solicitudes POST en Express.js versión 4 y superior
var routes = require('./routes'); //manejador de rutas de express
var cors = require('cors');

var app = express();  //crea el servicio

app.listen(process.env.PORT || 3001, function() {     //se pone a escuchar en el puerto 3001
});

app.use(bodyParser.urlencoded({extend: true})); //le digo al sistema que voy a parsear el cuerpo de la respuesta de la solicitud
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes); //app.use obtiene el prefijo de URL que desea y el manejador de ruta para él. Esto permite la modularidad en el enrutamiento del lado del servidor.
