var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.use('/hello', function(req, res){
    res.status(200).send('hello world');
});

var messages = [{
    id: 1,
    text: 'hola, soy un mensaje',
    author: 'Roberto Saez'
}];

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con sockets');
    socket.emit('mensajes', messages);

    socket.on('newMessage', function(data){
        messages.push(data);

        io.sockets.emit('mensajes', messages);
    });
});


server.listen(8080, function(){
    console.log('Servidor corriendo en http://localhost:8080');
});
