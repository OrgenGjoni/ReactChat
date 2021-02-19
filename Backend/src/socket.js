require('dotenv').config();
privateKey = process.env.PRIVATE_KEY;
clientAddress = process.env.CLIENT_ADDRESS;
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const newMessage = require('./socket_controllers/new_message_controller');
const newConversation = require('./socket_controllers/new_conversation_controller');
const readMessages = require('./socket_controllers/read_messages_controller');
const OnlineUsers = require('./OnlineUsers');

const socket = (server)=>{

  const ConnectedUsers = new OnlineUsers();



  const io = require('socket.io')(server,{
    cors: {
      origin: clientAddress,
      methods: ["GET", "POST"]
    },
     pingInterval : 10000,
     pingTimeout : 5000,
  });





  io.on('connection',async (socket)=>{

    try{

      let newUser = {
        name : null,
        _id : null,
        connection_id : null
      };

      let decoded;

    socket.on('log_in',async (token)=>{

      try{
        decoded = jwt.verify(token,privateKey);

      if(decoded){

          newUser = {
          name : decoded.data.name,
          _id : decoded.data._id,
          connection_id : socket.id
        }

        ConnectedUsers.add(newUser);
        ConnectedUsers.disconnected.map((el)=>{io.to(el.connection_id).emit('loged_out');});
        ConnectedUsers.clearDisconnect();
        socket.emit('id',newUser);
        const clientOnlineList = ConnectedUsers.clientUsers;
        io.emit('online_users',clientOnlineList);
      }


      socket.on('log_out',(user)=>{
        ConnectedUsers.remove(user);
      })


    }catch(err){

      socket.emit('loged_out');
      console.log(err.message);


    }

    });








     socket.on('newmessage',(message)=>{
       newMessage(io,ConnectedUsers.users,message);
     });

     socket.on('newconversation',(message)=>{

       newConversation(io,ConnectedUsers.users,message)
     });

     socket.on('read',(convId)=>{
       readMessages(io,convId,decoded.data._id);
     });



    socket.on('disconnect',()=>{

      ConnectedUsers.remove(newUser);

      io.emit('online_users',ConnectedUsers.clientUsers);
    });



  }catch(err){
    socket.emit('loged_out');
    console.log(err.message);



  }
  })





}

module.exports = socket;
