const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const mongoose = require('mongoose');
const _ = require('lodash');
const ObjectId = mongoose.Types.ObjectId;
const ConversationModel =  require('../models/conversation_model');


const getConversationsList = async (req,res)=>{
  const token = req.params.token;

  try{
          const decoded = jwt.verify(token,privateKey)
          const result = await ConversationModel.find({partecipants : {$elemMatch : {user_id : ObjectId(decoded.data._id)}}}).sort({update_time : -1}).exec();

          const final = _.map(result, conv => ({
            conv_id : conv._id,
            //Filters partecipants and filter out user's username from the array;
            partecipants : _.map(_.filter(conv.partecipants,(part)=>(part.user_id != decoded.data._id)),(el)=>({username : el.username})),
            conversation : conv.conversation[conv.conversation.length - 1],
            //Filter unread messages
            unread_mesages : _.filter(conv.conversation,(msg)=>{
                  if(msg.sender_id != decoded.data._id){
                    const readList = _.filter(msg.read_list,(part)=>(part.user_id == decoded.data._id && part.read == false));
                    if(readList.length > 0){
                      return true;
                    }else{
                      return false;
                    }
                  }else{
                    return false;
                  }
            }).length
          }))
          res.json(final);
  }catch(err){
    console.log(err.message);
  }

}

////////////////////////////////////////////

const getConversationsMessages = async (req,res)=>{
  const token = req.params.token;
  const convId = req.params.conv_id;

  try{
    const decoded = jwt.verify(token,privateKey);

    //Set as read all messages where user is partecipant
    await ConversationModel.updateOne({'conversation.conv_id' : convId },{$set : {'conversation.$[msg].read_list.$[part].read' : true }},{arrayFilters : [{'part.read' : false  },{'msg.sender_id' : {$ne : decoded.data._id}}]}).exec();

    const result = await ConversationModel.findById(convId).exec();
    if(result != null){
      res.json(result.conversation);
    }else{
     res.json([]);
    }
  }catch(err){
    res.json(err.message);
  }
}

module.exports = {getConversationsList,getConversationsMessages}
