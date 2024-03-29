import React from 'react';
import {makeStyles,withWidth,Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import InputField from './InputField';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import NoChat from './NoChat';

const newStyle = makeStyles(()=>({

  chatBoxMobile : {
    width : '100vw',
    backgroundColor : '#262d31',
    height : '100vh',
    flexWrap : 'nowrap'
  }

}))
const ChatBoxContainer = ({width})=>{


const [activeChat,activeUser] = useSelector((state) => [state.activeChat,state.activeUser]);
const style = newStyle();

  return (
    <Grid
    container
    direction = 'column'
    justifyContent = 'flex-end'
    className = {style.chatBoxMobile}
    >


      <ChatHeader />
      {activeChat || activeUser? <Chat /> : <NoChat />}
      {activeChat || activeUser ? <InputField socket /> : null}
    </Grid>

  );
}

export default withWidth()(ChatBoxContainer);
