var server = require('./app')
var port = process.env.PORT || 3001;

server.listen(port, function(){
  console.log('bla');
})
