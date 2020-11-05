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