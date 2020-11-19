//we need http because we don't have express.
const http = require('http');
//we need socketio and it's 3rd party instead of websocket api.
const socketio = require('socket.io');

//we made an http server with node.
const server = http.createServer((req, res) => {
    res.end("I am connected wahwahwah!")
});

const io = socketio(server);

io.on('connection', (socket, req)=>{
    //ws.send becomes socket.emit.
    socket.emit('welcome','Welcome to the websocket server!!!');
    //no change here.
    socket.on('message', (msg) => {
        console.log(msg);
    });
});

server.listen(8000);