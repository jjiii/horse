const { Duplex } = require('stream');

class Multiple extends Duplex {



  constructor(sousce,options) {
    super(options);
  }

  read(size) {
     //resume();

     console.log("Multiple read");
     this.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
     //this.push(null);
     return null;
  }

  write(chunk, encoding, callback) {
    console.log("Multiple write");
  }


}

export {Multiple};
