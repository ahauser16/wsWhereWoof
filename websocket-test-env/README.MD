NOTES from tutorial as comments.
I.  file name: justWs.html
code:


<script>

// *NOTES REFERENCING THIS BELOW.  In this example below 'this' points to the empty object in memory that the 'new' operator created.  Below 'this.url' and 'this.protocols' are adding properties onto the empty-object which 'ws' points to.
// REMEMBER as long as the function does not return a value the JS engine will return that object that was set as the 'this' variable before the function started executing - when the Execution Context was created.

//url --> The URL to which to connect; this should be the URL to which the WebSocket server will respond. This should use the URL scheme wss://, although some software may allow you to use the insecure ws:// for local connections.

//protocols --> Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol). If you don't specify a protocol string, an empty string is assumed.


/*=====================
function WebSocket()  {

this.url = 'url';
this.protocols = 'protocols';
}
======================*/
/*REMEMBER - If you want to open a connection and are flexible about the protocols you support, you can specify an array of protocols.
var exampleSocket = new WebSocket("wss://www.example.com/socketserver", ["protocolOne", "protocolTwo"]);
=====================*/

//we declare the 'ws' variable and assign it to:
// the 'new' operator which creates an empty object and invokes the function: 'WebSocket();' and together with the JS engine's Execution Context creates the variable: 'this' which points to the newly created empty-object in memory.
//*SEE NOTES REGARDING THIS ABOVE.
let ws = new WebSocket(url, protocols);
//QUESTION why isn't this console.log working?
console.log(ws);

//at this point we need to tell it where to connect to (the URL part). The JS part is setup now we need to create something for it to connect to.  Refer to ws npm docs.  We will DL a node module which is the server and the browser client must use the native WebSocket object.

//as soon as the connection opens we will send a message to whoever we are connected to which is the ws://localhost:8000.
ws.onopen = (event)=>{
    ws.send('I am so excited to be connected!  awOOOOOOO!!!')
};

//once the ws is created and we are connected then .onmessage is a property that whenever someone sends us a message this function will run and log it.
ws.onmessage = (event)=>{
    //this console.log also doesn't work.
    console.log(event);
}

</script>
================================

II.  file name: justWsServer.js
code:

const http = require('http');
// 3rd party module, ws!
const websocket = require('ws');

//this is the server we're listening to and if there is http traffic on port 8000 then the server is created.
const server = http.createServer((req, res) => {
    res.end("I am connected yo!")
});

//now we need to make a websocket server (wss) for the server (a pre-created Node.js HTTP/S server) to connect to.
const wss = new websocket.Server({ server });
//we're using the 'headers' Event (refer to ws documentation on github) which returns headers (as an array) and request (as an object)
//This Event is emitted before the response headers are written to the socket as part of the handshake. This allows you to inspect/modify the headers before they are sent.
wss.on('headers', (headers, req) => {
    //QUESTION - this console.log isn't working.
    console.log(headers);
});

wss.on('connection', (ws, req) => {
    ws.send('Welcome to the websocket server!!!');
    ws.on('message', (msg) => {
        console.log(msg);
    });
    //QUESTION - this console.log isn't working.
    console.log(req);
});

console.log(server);
//QUESTION: why doesn't this console.log work?
// console.log(req);

server.listen(8000);

========================================

NOTES from tutorial as comments.
III.  file name: chat.html
code:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

<style>
    input {
        width: 100%;
        height: 35px;
    }
    #messages{
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    #messages li{
        padding: 5px 10px;
    }
    #messages li:nth-child(odd){
        background: #eee;
    }
</style>

<div class="container">
    <div class='row'>
        <div class='col-sm-12'>
            <form id='message-form'>
                <div class='col-sm-10'>
                    <input id='user-message' type='text' placeholder='Enter your message'>
                </div>
                <div class='col-sm-2'>
                    <input class='btn btn-primary' type='submit' value='Send!' />
                </div>
            </form>
            <ul id='messages'>
                <!-- This will be populated by Javascript! -->
            </ul>
        </div>
    </div>
</div>

<!-- this exposes io just like how require('socket.io') exposes Server. -->
<script src='/socket.io/socket.io.js'></script>
<script>
    //below the io function-->io('http://localhost:9000') is assigned to 'socket' which is the client side server. 
    const socket = io('http://localhost:9000');
    console.log(socket.io)
    socket.on('connect',() => {
        console.log(socket.id);
    })
    socket.on('messageFromServer',(dataFromServer)=>{
        console.log(dataFromServer);
        socket.emit('dataToServer',{data: "Data from the Client!"})
    })
        
    document.querySelector('#message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        //here we want to see what the user entered into the form.
        const newMessage = document.querySelector('#user-message').value;
        console.log(newMessage);
        //now that we have the value we want to send it over to the server.
        socket.emit('newMessageToServer', { text: newMessage })
    })

    socket.on('messageToClients', (msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })

    // socket.on('ping', () => {
    //     console.log('Ping was received from the server');
    // })

    // socket.on('pong', (latency) => {
    //     console.log(latency);
    //     console.log("Pong was sent to the server")
    // })

</script>

========================================

NOTES from tutorial as comments.
IV.  file name: chat.js
code:

const express = require('express');
const app = express();

/*this exposes or gives access to the server.  see socket.io>lib>index.js for source code.  there are three ways to create a new server:
a) const io = require('socket.io')();
b) const Server = require('socket.io');
c) const io = new Server(); 
...and in each case 'require('socket.io')' is referring to a function constructor under the hood and provides access to: new Server(httpServer[, options]).
*/
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

//'server.sockets' is a reference to 'io' which also points to our 'lowercase-s' server.
const io = socketio(expressServer);

//Event.'connect' is what we're using below and we're providing it with a callback that will be fired upon a connection from the client. the 'socket' parameter that comes with the callback is the underlying socket itself or the client that has just connected and points to the Socket class for interacting with browser clients.  A Socket belongs to a certain Namespace and uses an underlying Client to communicate.  The Socket class inherits from the EventEmitter class which is inside the Event module of the socket.io docs.  Also, when the client connects this is when you want to add all your listeners. 
io.on('connection', (socket) => {

    //https://socket.io/docs/server-api/#socket-emit-eventName-%E2%80%A6args-ack
    // socket.emit emits an event to the socket identified by the string name and can be named anything you want.
    // syntax: socket.emit(eventName[, …args][, ack])
    //eventName is the name of the event.
    //the args is the data that we want to send.
    //the ack argument is an optional argument and will be called with the client's answer.
    socket.emit('messageFromServer', { data: "Welcome to the socketio server" });

    //socket.on registers a new handler for an event which is from the eventemitter module that is part of core Node.js.
    //syntax:  socket.on(eventName, callback)
    //the callback function is going to get the data that was sent, as arguments from the socket.emit(eventName)
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });

    socket.on('newMessageToServer', (msg) => {
        // console.log(msg)
        io.emit('messageToClients', { text: msg.text })
    });
})

============================
N.B. at this point the code was refactored to have a scripts.js file and a styles.css file both saved in the public folder.