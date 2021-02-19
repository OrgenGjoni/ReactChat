import React from 'react';
import {makeStyles,withWidth,Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import InputField from './InputField';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import NoChat from './NoChat';

const newStyle = makeStyles(()=>({
  chatBoxFull : {
    width : '75vw',
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
    justify = 'flex-end'
    className = {style.chatBoxFull}
    >


      <ChatHeader />
      {activeChat || activeUser? <Chat /> : <NoChat />}
      {activeChat || activeUser ? <InputField socket /> : null}
    </Grid>

  );
}

export default withWidth()(ChatBoxContainer);
