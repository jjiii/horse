<template>

<div class="bg-gradient-primary">

  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-3"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome to horse!</h1>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">
                    </div>

                    <a href="#" @click="open('')" class="btn btn-primary btn-user btn-block">
                      Login
                    </a>
                    <!-- <hr>
                    <a href="index.html" class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a> -->
                  </form>
                  <hr>
                  <div class="text-center">
                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div>

                </div>
              </div>
              <div class="col-lg-3"></div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>


</div>
</template>


<script>

  import SystemInformation from './LandingPage/SystemInformation'
  import {socks5}  from './socks/Socks5.js'

  import {Multiple}  from './multiple/Multiple.js'
  //const {Multiple} = require ('./muliple/Multiple')


  const url = require('url')
  const net = require('net')
  const http = require('http')
  const http2 = require('http2')  // 目前浏览器只支持ssl 上的 http2
  const { Readable } = require('stream')

  const {pipeline} = require('stream')
  const WS = require('ws')

  const { simpleflake } = require('simpleflakes');




//import {wsServer, httpServer} from './receive'
import  starWS from './receive'

starWS();







function createWebsocket(){
    var ws = new WS('ws://localhost:3000/ws');
    ws.on('open', function open() {
      console.log('client: open ');
    });
    ws.on('message', function incoming(data) {
      console.log("client: recive ");
      console.log("client:" + data.toString());
    });
    ws.on('error', function error(mess) {
      console.log("client: error"+mess);
    });

    return ws;
}
function wsToStream(ws){
  var stream = WS.createWebSocketStream(ws, {encoding: 'utf8'});
  stream.on('end', () => {
    console.log('ws end');
  });
  stream.on('data', (chunk) => {
    console.log("wsToStream on data: " + chunk);
  });

  return stream;
}
const ws = createWebsocket();
const wsStream = wsToStream(ws);





function localListen(){
    const server = net.createServer((socket) => {

          socket.on('data', (data) => {
              console.log(socket);
              console.log(socket.id);
              console.log("socket on data:" );
              console.log(data.toString());
              socket.pipe(wsStream,{end:false});
          });
          socket.on("error",function(err){
            console.error(err);
            socket.end();
          });

          socket.on('end', () => {
            console.log('socket end' + socket.id);
            socket.destroy();
          });


    });
    server.on('connection',(socket)=>{
          console.log("listen connection id :" + socket.id);
          if(!socket.id){
            socket.id = simpleflake().toString()
            console.log("connection set socket.id :" + socket.id);
          }else{
            console.log("connection has socket.id :" + socket.id);
          }


    })

    server.on('error', (err) => {
        console.log("listen error" + err);
    });

    server.listen(9999, () => {
        console.log(server.address());
    });

    return server;
}

localListen();


  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open() {

            console.log(process.versions.node);
            console.log(process.versions.electron);
            //wsStream.pipe(m);
            //ws.send("a");

            var m = new Multiple();

            //m.on('readable', function() {
            //    console.log("on readable");
            //});

            m.on('data', (chunk) => {
              console.log('stream on data', chunk);
            });

            //m.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            //m.push(null);


            //m.pipe(wsStream);
            //m.destroy();
            //m.push("b");
      },

    }
  }
</script>

<style>

</style>
