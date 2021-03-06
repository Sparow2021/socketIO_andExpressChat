//серверная часть
let express = require('express');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);


server.listen(3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];


io.sockets.on('connection', function(socket){
    console.log('Успешное соединение');
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1)
        console.log('Отключились');
    })

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {msg: data.mess, name: data.name, className: data.className})
    })
});
