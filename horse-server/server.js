const { URL } = require('url')
const net = require('net')
const http = require('http')





let server =  http.createServer((req,res)=>{
	let url = req.url;
	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
	res.end('client-url：'+url);
});

server.on('connect', (req, cltSocket, head) => {
	//console.log(head);
	// Connect to an origin server
	const { port, hostname } = new URL(`http://${req.url}`);

  const srcNet = net.connect(port || 80, hostname);
	srcNet.on('connect',function () {

	  console.log(hostname + ':' + port + 'connect ok');

	  cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
					   'Proxy-agent: Node.js-Proxy\r\n' +
					   '\r\n');
	  srcNet.write(head);
	  srcNet.pipe(cltSocket);
	  cltSocket.pipe(srcNet);

	});

	srcNet.on('error',function (msg) {
	  console.log("connect  end : =====" + msg);
	  srcNet.destroy();//end()
	});

	srcNet.on('timeout', (msg) => {
	  console.log('timeout' + msg);
	  srcNet.destroy();//end()
	});

});


server.listen(9999, () => {
		console.log('https connect proxy server listen:' ,  server.address().port);
});
