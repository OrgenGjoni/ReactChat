import React,{useEffect} from 'react';
import {makeStyles,withWidth,Container,Grid} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchConversations,setOnlineList,setId,setConversationsList,setActiveChat,setMessages,newMsgNotification} from './store/actions';
import _ from 'lodash';
import socket from './socket';



import SideBarContainer from './components/sidebar/SideBarContainer';
import ChatBoxContainer from './components/chatbox/ChatBoxContainer';

import SideBarContainerSM from './components/sidebar/SideBarContainerSM';
import ChatBoxContainerSM from './components/chatbox/ChatBoxContainerSM';
const SERVER = process.env.REACT_APP_SERVER_ADDRESS;

const newStyle = makeStyles(()=>({
  container : {
    padding : 0,
    height : '100vh',
    overflowY : 'hidden',

  }
}))


const notification = new Audio('notification.mp3');


const ChatPage = ({width})=>{



  const dispatch = useDispatch();
  const [activeChat,activeUser,conversations_list,messages,id,slideOpen] = useSelector((state)=>[state.activeChat,state.activeUser,state.conversations,state.messages,state.id,state.slideOpen]);
  const history = useHistory();
  const style = newStyle();




  const addNewConversation = (conv)=>{


    const newConv = [conv].concat(conversations_list);
    dispatch(setConversationsList(newConv));

    const part = _.find(conv.partecipants, (part)=>(part.username === activeUser.username));


    if(typeof part != 'undefined'){
       dispatch(setMessages([conv.conversation]));
       dispatch(setActiveChat(conv));
    }
  }

  const addNewMessage = (msg)=>{
    const convListCopy = Object.assign([],conversations_list);
    const conv = _.find(convListCopy,(conv)=>(conv.conv_id === msg.conv_id));
    const filtered = _.filter(convListCopy,(conv)=>(conv.conv_id !== msg.conv_id));
    conv.conversation = msg;
    if(conv.conv_id !== activeChat.conv_id){
      conv.unread_mesages = conv.unread_mesages + 1;
    }else{
      const newMsgArray = messages.concat([msg])
      dispatch(setMessages(newMsgArray));
      socket.emit('read',conv.conv_id);
    }

    const newConvList = [conv].concat(filtered);

    dispatch(setConversationsList(newConvList));
  }



  useEffect(()=>{

    if(localStorage.getItem('token') == null){
      history.push('/')
    }else{

      dispatch(fetchConversations(SERVER + '/conversations/' + localStorage.token))

      socket.on('connect_error',(err)=>{
        if(err.message === 'Authentication Error'){
          localStorage.clear();
          history.push('/');
        }
      });

      socket.emit('log_in',localStorage.getItem('token'));
      socket.on('loged_out',()=>{

        localStorage.clear();
        history.push('/');
        console.log('Disconnected from server');
      })

      socket.on('online_users',(res)=>{
        dispatch(setOnlineList(res));
      });

      socket.on('id',(res)=>{
        dispatch(setId(res));
      })



    }
  },[])

  useEffect(()=>{

    socket.on('newconversation',(conv)=>{
      addNewConversation(conv);

      if(conv.conversation.sender_id !== id._id || slideOpen === false){
        dispatch(newMsgNotification());

      }

      if (( window.innerWidth >= 800 ) && ( window.innerHeight >= 600 )){
        alert('stuff');
        notification.play();
      }


    })

    return ()=>{socket.off('newconversation')}
    }

  );



  useEffect(()=>{
    socket.on('newmessage',(msg)=>{
      addNewMessage(msg);

      if(msg.conv_id !== activeChat.conv_id){
        dispatch(newMsgNotification());
      }

      if (( window.innerWidth >= 800 ) && ( window.innerHeight >= 600 )){
        notification.play();
      }

    });

    return ()=>{socket.off('newmessage')}
  })

  return(
      <Container
        maxWidth='xl'
        component = 'main'
        className = {style.container}
      >
          <Grid
            container
            direction = 'row'
            justify = 'center'
          >
              {(width === 'xs' || width === 'sm' || width === 'ms' )  ? <SideBarContainerSM /> : <SideBarContainer />}
              {(width === 'xs' || width === 'sm' || width === 'ms' )  ? <ChatBoxContainerSM /> : <ChatBoxContainer />}


            </Grid>
      </Container>
  );
}



export default withWidth()(ChatPage);
