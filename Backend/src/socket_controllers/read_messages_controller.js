const _ = require('lodash');
const ConversationModel = require('../models/conversation_model');

const readMessages = async (convId,userId)=>{
  try{
  await ConversationModel.updateOne({'conversation.conv_id' : convId },{$set : {'conversation.$[msg].read_list.$[part].read' : true }},{arrayFilters : [{'part.read' : false  },{'msg.sender_id' : {$ne : userId}}]}).exec();
}catch(err){
    console.log(err);
  }
}

module.exports = readMessages;
