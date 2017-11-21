var server = require('./app')
var port = process.env.PORT || 3001;
var firebase = require('firebase');

server.listen(port, function(){
  console.log('bla');
})

var config = {
    apiKey: "AIzaSyAI7M3n5HFlfkjIUJRxgBG11Ho8sIAdIHc",
    authDomain: "apihotelznode.firebaseapp.com",
    databaseURL: "https://apihotelznode.firebaseio.com",
    projectId: "apihotelznode",
    storageBucket: "apihotelznode.appspot.com",
    messagingSenderId: "803982961548"
};
firebase.initializeApp(config);
