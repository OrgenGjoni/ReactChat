import React,{useState} from 'react';
import {makeStyles,Grid,TextField,IconButton,InputAdornment} from '@material-ui/core';
import { AiOutlineSend } from 'react-icons/ai';
import {setConversationsList,setMessages} from '../../store/actions'
import {useDispatch,useSelector} from 'react-redux';
import _ from 'lodash';
import socket from '../../socket';

const newStyle = makeStyles(()=>({
  container : {

  },
  input : {
    fontSize : '1.2em',
    color : 'white'
  },
  button : {
    width : '5em',
    float : 'right'
  }
}))


const InputField = ()=>{

  const [id,activeChat,activeUser,messages,conversations_list] = useSelector((state)=> [state.id,state.activeChat,state.activeUser,state.messages,state.conversations]);
  const dispatch = useDispatch();
  const style = newStyle();

  const [message,setMessage] = useState('');

  const newMessage = ()=>{

    const msgData = {
      sender_id : id._id,
      conv_id : activeChat.conv_id,
      message : message,
    }



    socket.emit('newmessage',msgData);
    setMessage('')

    const convListCopy = Object.assign([],conversations_list);
    const conv = _.find(convListCopy,(conv)=>(conv.conv_id === activeChat.conv_id));
    const filtered = _.filter(convListCopy,(conv)=>(conv.conv_id !== activeChat.conv_id));
    conv.conversation = msgData;
    const newConvList = [conv].concat(filtered);
    dispatch(setConversationsList(newConvList));

    const msgArrayCopy = Object.assign([],messages);
    const newMsgArray = msgArrayCopy.concat(msgData);
    dispatch(setMessages(newMsgArray));

  }


  const newConversation = ()=>{
    const msgData = {
      sender_id : id._id,
      reciever_id : activeUser.user_id,
      message : message
    }


    socket.emit('newconversation',msgData);
    setMessage('');

  }

  const handleSubmit = ()=>{
    if(activeChat){
      newMessage();
    }else{
      newConversation();
    }



  }

  const okayPress = (e)=>{
    if(e.key === 'Enter'){
      handleSubmit();
    }
  }

  const EndAdornment = ()=>(
   <InputAdornment position="end">
      <IconButton edge="end" onClick = {handleSubmit} >
        <AiOutlineSend size = {'1.5em'} color = {'#828689'} />
      </IconButton>
    </InputAdornment>

  );


  return(
    <Grid
      container
      direction = 'row'
      className = {style.container}
    >
      <TextField
        id="filled-secondary"
        type = 'text'
        placeholder = 'Type a message...'
        value = {message}
        fullWidth
        margin = 'dense'
        variant = 'outlined'
        multiline
        onChange = {(e)=>{setMessage(e.target.value)}}
        onKeyPress = {(e)=>{okayPress(e)}}
        rowsMax = {4}
        InputProps={{
            endAdornment:  <EndAdornment />,
            className : style.input
          }}
        />



    </Grid>
  );
}

export default InputField;
