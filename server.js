var server = require('./app')
var port = process.env.PORT || 3002;
var firebase = require('firebase');

server.listen(port, function(){
  console.log('listening in port ' + port + '...');
})

var config = {
  apiKey: "AIzaSyBPu2i5JN2L-THImOfA98EHnoj1M8j5mhw",
  authDomain: "gohotels-5a589.firebaseapp.com",
  databaseURL: "https://gohotels-5a589.firebaseio.com",
  projectId: "gohotels-5a589",
  storageBucket: "gohotels-5a589.appspot.com",
  messagingSenderId: "827262016005"
};
firebase.initializeApp(config);
