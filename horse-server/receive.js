const URL = require('url')
const http = require('http')
const  WS = require('ws')
const { BPMux } = require('bpmux')
const server = require('./server');






function wsServer(){

  var httpServer =  http.createServer();

  var wsServer = new WS.Server({server: httpServer });
  wsServer.on('connection', function (ws, req) {

      console.log("wsServer: recive client connection");
      ws.on('message', function incoming(data) {
        console.log("wsServer: receive " );
        //console.log(data);
        console.log(data);
        ws.send("5440923399260605165abcd");
      });
      ws.on('error', function error (mess) {
        console.log("wsServer: error" + mess);
      });

      var ws_stream = WS.createWebSocketStream(ws, { encoding: 'utf8' });

      // stream.pipe(multiplex,{end:false});


      var bpmux = new BPMux(ws_stream, { keep_alive: false });

      bpmux.on('error', function (err){
        console.log("err==========" + err);
        //bpmux.end();
      });


      bpmux.on('handshake', function (duplex, handshake_data){

        console.log("bpmux handshake" + duplex._chan);

        duplex.on('data', function (d) {
            //console.log("bpmux duplex data:", duplex._chan, d);
            console.log("bpmux duplex data to string:", duplex._chan, d.toString());
        });

        duplex.on('error', function (err){
          console.log("err!!!!!!" + err);
          duplex.end();
        });
      });



  });

  httpServer.listen(3000, function () {
    console.log("websocket server listen:", httpServer.address().port);
    console.log("I don't want to start two services, but you know!  rubbish node.js" );
  })
  return httpServer;
}

wsServer();
