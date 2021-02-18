const _ = require('lodash');
const ConversationModel = require('../models/conversation_model');
const UserModel = require('../models/users_model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



const newMessage = async (io,allOnlineUsers,message)=>{
   try{
  const conversation = await ConversationModel.findById(message.conv_id);
  //Set message read_status to false


    if(conversation == null){
        // TODO: In case of wrong conversation _id
    }else{

          //Set read_list with recievers only
          const recieversOnly = _.filter(conversation.partecipants,(part)=>(part.user_id != message.sender_id));
          message.read_list = _.map(recieversOnly, (part)=>({user_id : part.user_id,username : part.username,read : false}));

        //Push new message
        const result = ConversationModel.findByIdAndUpdate(conversation._id,{$push : {conversation : message}, $set : {update_time : Date()}}).exec();

        //Get list of partecipants other from sender
        const partecipants = _.filter(conversation.partecipants, (el)=>(el.user_id != message.sender_id));

        //Map our filtered array finding corresponding online user connection_id to emit message for each one
        partecipants.map((el)=>{
          const reciever = _.find(allOnlineUsers,(usr)=>(usr._id == el.user_id));
          typeof reciever != 'undefined' ? io.to(reciever.connection_id).emit('newmessage',message) : null
        })


    }



  }catch(err){
    console.log(err);
  }
}
/////////////////////////


module.exports = newMessage;
