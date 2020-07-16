const URL = require('url')
const http = require('http')
//const  WebSocket = require('websocket-stream')
const  WS = require('ws')
//const pipeline = require('stream')
//const tentacoli = require('tentacoli')





function starWS(){

  var httpServer =  http.createServer();

  var wsServer = new WS.Server({server: httpServer });
  wsServer.on('connection', function (ws, req) {

      console.log("wsServer: recive client connection");
      ws.on('message', function incoming(data) {
        console.log("wsServer: receive " );
        console.log(data);
        console.log(data.toString());
        ws.send("wsServer send to client .....");
      });
      ws.on('error', function error(mess) {
        console.log("wsServer: error"+mess);
      });

      var stream = WS.createWebSocketStream(ws, { encoding: 'utf8' });

      // stream.pipe(multiplex,{end:false});


  });



  httpServer.listen(3000, function () {
    console.log('wsServer listening on', httpServer.address().port);
  })
  return httpServer;
}

//export  wsServer;
export default starWS;
