const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;


const conversationSchema = new Schema({
  update_time : {type : Date, default : Date.now},
  partecipants : {type : Array,required : true},
  conversation : [{
                  sender_id : {type : String},
                  conv_id : {type : String},
                  message : {type : String},
                  read_list : {type : Array}

                }],
  unread_mesages : {type : Number}
},{collection : 'conversations'});


module.exports = mongoose.model('conversation',conversationSchema);
