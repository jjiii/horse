const { Duplex } = require('stream')
const { EventEmitter } = require('events')
const { simpleflake } = require('simpleflakes')

class Multiple extends EventEmitter{

  allChannel = new Map();

  constructor(outStream) {
    super();
    this.outStream = outStream;
    this.init();
  }

  init(){

    this.outStream.on('data', (data) => {
        console.log(this.id, this.allChannel);
        // console.log(typeof data,"wsToStream on message: " + data);
        var id =  data.slice(0,19);
        var inquiry = data.slice(19,20);
        var state = data.slice(20, 21);
        var source = data.slice(21);

        //var buffer = Buffer.from(data);
        var isExistChannel = this.allChannel.get(id);

        if(inquiry){
            if(!isExistChannel){
                //stream is close
            }else{

            }
            return;
        }




        if(isExistChannel == null){
          var newChannel = this.newChannel(id);

          var isOk = newChannel.push(source);
          if(!isOk){
            channel.destroy("channel id: ", channel.id, " Over buffer and channel is destroy");
          }
          this.emit('message', newChannel);
        }else{
          var isOk = isExistChannel.push(source);
          if(!isOk){
            channel.destroy("channel id: ", channel.id, " Over buffer and channel is destroy");
          }
          this.emit('message', isExistChannel);
        }


    });

    this.outStream.on('end', () => {
      console.log('wsToStream end');
    });
    this.outStream.on('error', (mess) => {
      console.log("wsToStream: error"+mess);
    });

  }


  newChannel(id){
    if(id == null){
      id = simpleflake().toString();//19 Byte
    }
    var newChannel = new Channel(id, null);

    this.allChannel.set(id, newChannel);
    return newChannel;
  }

  getChannelById(id){
      return this.allChannel.get(id);
  }



  deleteChannel(key){
    var channel = this.allChannel.get(key);
    if(channel != null){
      channel.destroy();
      this.allChannel.delete(key);
    }

  }

  destroy(){

    this.allChannel.forEach((value, key)=> {
      this.deleteChannel(key);
    })
    this.allChannel.clear();

  }



  sendInquiryMessages(){
      this.outStream = outStream;
  }

  replyInquiryMessages(){
      this.outStream = outStream;
  }
}


class Channel extends Duplex {

  outStream = null;

  //inquiry = 0;    //whether or not inquiry state message; 0=no, 1=yes
  state = "a";    //a=create, b=communication, c=delete

  constructor(id, options) {
    super(options);
    this.id = id;
    console.log("Channel is create");
  }




  _read(size) {
     //resume();
     //this.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
     //this.push(null);
     console.log("Channel read");
  }

  _write(chunk, encoding, callback) {
    outStream.write(this.id + 0 + this.state + chunk); //inquiry=0
    console.log("Channel write");
  }

}

export {Multiple, Channel};
