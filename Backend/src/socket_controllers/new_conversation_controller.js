const _ = require('lodash');
const ConversationModel = require('../models/conversation_model');
const UserModel = require('../models/users_model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const newConversation = async (io,allOnlineUsers,message)=>{

   try{
  const conversation = await ConversationModel.findOne({$and:[{'partecipants.user_id' : ObjectId(message.sender_id)},{'partecipants.user_id' : ObjectId(message.reciever_id)}]}).exec();

    if(conversation == null){
        const sender = await UserModel.findById(ObjectId(message.sender_id)).exec();
        const reciever = await UserModel.findById(ObjectId(message.reciever_id)).exec();

        //Create new object be inserted and create new conversation
        const conv = {
          partecipants : [{username : sender.username,user_id :sender._id},{username : reciever.username,user_id : reciever._id}],
          conversation : [],
          unread_mesages : 0,
        }

        const newConv = await ConversationModel.create(conv);

        const recieverReadListEl = {
          user_id : reciever._id,
          username : reciever.username,
          read : false
        }

        const newMsg = {
          sender_id : sender._id,
          conv_id : newConv._id,
          message : message.message,
          read_list : [recieverReadListEl],
        }

        //Update the created conversation by pushing the newMsg in the conversation array
        const updatedConv = await ConversationModel.findByIdAndUpdate(newConv._id,{$push : {conversation : newMsg}},{new: true}).exec();

        //The conversation object that will be sent to the client
        const recieverConv = {
          conv_id : updatedConv._id,
          partecipants : _.map(_.filter(updatedConv.partecipants,(part)=>(part.user_id == message.sender_id)),(el)=>({username : el.username})),
          conversation : updatedConv.conversation[updatedConv.conversation.length - 1],
          unread_mesages : 1
        }

        // TODO: Create a function to filter each reciever so his name wont be in the partecipants array
        const senderConv = {
          conv_id : updatedConv._id,
          partecipants : _.map(_.filter(updatedConv.partecipants,(part)=>(part.user_id != message.sender_id)),(el)=>({username : el.username})),
          conversation : updatedConv.conversation[updatedConv.conversation.length - 1],
          unread_mesages : 0
        }

        const senderPart = _.filter(updatedConv.partecipants, (el)=>(el.user_id == message.sender_id));

        //Map our filtered array finding corresponding user who created the new conversation
        senderPart.map((el)=>{
          const reciever = _.find(allOnlineUsers,(usr)=>(usr._id == el.user_id));
          typeof reciever != 'undefined' ? io.to(reciever.connection_id).emit('newconversation',senderConv) : null
        })

        const recieverPart = _.filter(updatedConv.partecipants, (el)=>(el.user_id != message.sender_id));

        //Map our filtered array finding corresponding other users corresponding to the new conversation

        recieverPart.map((el)=>{
          const reciever = _.find(allOnlineUsers,(usr)=>(usr._id == el.user_id));
          typeof reciever != 'undefined' ? io.to(reciever.connection_id).emit('newconversation',recieverConv) : null
        })

    }else{

      // TODO: When user has 'deleted' conversation...
    }

  }catch(err){
    console.log(err);
  }
}



module.exports = newConversation;
