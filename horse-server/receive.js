const URL = require('url')
const http = require('http')
//const  WebSocket = require('websocket-stream')
const  WS = require('ws')
const pipeline = require('stream')
const tentacoli = require('tentacoli')



  var httpServer =  http.createServer();

  var wsServer = new WS.Server({server: httpServer });
  wsServer.on('connection', function (ws, req) {

      console.log("server: recive client connection");
      ws.on('message', function incoming(data) {
        console.log("server: receive " );
        console.log("toStream:======================="+data.toString());
      });
      ws.on('error', function error(mess) {
        console.log("server: error"+mess);
      });

      var stream = WS.createWebSocketStream(ws, { encoding: 'utf8' });
      console.log("writing stdout=============================");
      //stream.pipe(process.stdout);
      // var stream = WS.createWebSocketStream(ws, { encoding: 'utf8' });
      // //stream._socket = conn._socket

      var receiver = tentacoli();
      

      receiver.on('request', function request (req, reply) {
        // just echo
        console.log("tentacoli handle:" + req);

        reply(null, req);
      })

      stream.pipe(receiver,{end: false});
      receiver.pipe(stream,{end: false});

  });



  httpServer.listen(3000, function () {
    console.log('wsServer listening on', httpServer.address().port);
  })
