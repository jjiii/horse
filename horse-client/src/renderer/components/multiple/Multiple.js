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
        var state = data.slice(19,20); // 0:delete, 1:communication
        var source = data.slice(20);

        //var buffer = Buffer.from(data);
        var isExistChannel = this.allChannel.get(id);

        if(state){
            if(isExistChannel){
                this.writeToChannel(isExistChannel, source);
            }else{
                var newChannel = this.newChannel(id);
                this.writeToChannel(newChannel, source);
            }
            return;
        }else{
            this.deleteChannel(id);
        }


    });



    this.outStream.on('end', () => {
      console.log('wsToStream end');
    });

    this.outStream.on('error', (mess) => {
      console.log("wsToStream: error"+mess);
      this.destroy();
    });

  }


  newChannel(id){
    if(id == null){
      id = simpleflake().toString();//19 Byte
    }

    var newChannel = new Channel(id, 1, this.outStream, null);

    this.allChannel.set(id, newChannel);
    return newChannel;
  }


  deleteChannel(key){
    var channel = this.allChannel.get(key);
    if(channel != null){
      channel.destroy();

      this.allChannel.set(key, null);
      this.allChannel.delete(key);
    }

  }

  destroy(){
    this.allChannel.forEach((value, key)=> {
      this.deleteChannel(key);
    })
    this.allChannel.clear();
  }

  getChannelById(id){
      return this.allChannel.get(id);
  }


  writeToChannel(channel, source){
    var isOk = channel.push(source);
    if(isOk){
      this.emit('message', channel);
    }else{
      console.log("channel id: ", channel.id, " steam over buffer！");
      //channel.destroy("channel id: ", channel.id, " Over buffer and channel is destroy");
    }
  }




  sendInquiryMessages(){
      this.outStream = outStream;
  }

  replyInquiryMessages(){
      this.outStream = outStream;
  }
}


class Channel extends Duplex {


  constructor(id, state, outSteam, options) {
    super(options);
    this.id = id;
    this.state = state;
    this.outStream = outSteam;
    console.log("Channel is create");
  }




  _read(size) {
     //resume();
     //this.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
     //this.push(null);
     console.log("Channel read");
  }

  _write(chunk, encoding, callback) {
    this.outStream.write(chunk);
    //this.outStream.write(this.id +  this.state + chunk); //inquiry=0
    console.log("Channel write");
  }

  send(message){
    var isOk = this.push(source);
    if(!isOk){
      console.log("channel id: ", this.id + " state:"+this.state, " steam over buffer！");
    }
    return isOk;
  }

  sendDelete(){

  }


}

export {Multiple, Channel};
