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
              <div class="col-lg-6">

                  


              </div>
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










  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open () {
            console.log(process.versions.node);
            console.log(process.versions.electron);
           //var socket = socks5.create('127.0.0.1', 9999, null);
           //console.log(socket);
           //socket.connect('localhost', 9999);

           const http2 = require('http2');
           const server = http2.createServer();



           server.on('stream', (stream) => {
             stream.respond({ ':status': 200 }, { waitForTrailers: true });
             stream.on('wantTrailers', () => {
               stream.sendTrailers({ ABC: 'some value to send' });
             });
             stream.end('some data');
           });

           server.listen(8888);
      }
    }
  }
</script>

<style>

</style>
