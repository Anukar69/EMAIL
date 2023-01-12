
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema({
    name: {
        type: String
      },
      email: {
        type: String
      },
      message: {
        type: String
      },
      subject: {
        type: String
      },
      company : {
        type: String
      }
});

// const model = mongoose.model("messageSchema", messageSchema , 'messageSchema');

// module.exports = model


mongoose.model("messageSchema", messageSchema);
module.exports = mongoose.model("messageSchema");