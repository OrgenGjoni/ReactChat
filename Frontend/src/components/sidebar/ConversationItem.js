import React from 'react';
import {makeStyles,Grid,Badge} from '@material-ui/core';
import _ from 'lodash';

const newStyle = makeStyles(()=>({
  container : {
    padding : 0
  },
  read : {
    minHeight : '5em',
    borderBottom: '1px solid #30383d',
    padding : 0,
    cursor : 'pointer',
    '&:hover' : {
      backgroundColor : '#323739'
    }
  },

  unread : {
    minHeight : '5em',
    borderBottom: '1px solid #30383d',
    fontSize : '1.1em',
    padding : 0,
    backgroundColor : '#1a2125',
    color : 'white',

    cursor : 'pointer',
    '&:hover' : {
      backgroundColor : '#323739'
    }

  },

  newMessages : {
      color : 'green'
  }
}))

const ConversationItem = ({conversation,setActiveChat,loadMessages,id,readConversation,closeSlide})=>{

  const style = newStyle();


  const handleClick = ()=>{

        setActiveChat(conversation);
        readConversation(conversation);
        loadMessages(conversation.conv_id);
        closeSlide();
  }





  const Read = ()=>(
        <Grid
          container
          direction = 'column'
          justify = 'flex-start'
          alignItmes = 'center'
          className = {style.read}
        >
          {_.map(conversation.partecipants,(el)=>(<p>{el.username}</p>))}
          {conversation.conversation.message.length < 40 ? <small>{conversation.conversation.message}</small> : <small>{conversation.conversation.message.slice(0,37) + '...'}</small> }


        </Grid>
  );

  const Unread = ()=>(

    <Grid
      container
      direction = 'row'
      justify = 'flex-start'
      alignItmes = 'center'
      className = {style.unread}
    >
          <Grid
            container
            style = {{maxWidth : '85%'}}
            direction = 'column'
          >
              {_.map(conversation.partecipants,(el)=>(<p>{el.username}</p>))}
              {conversation.conversation.message.length < 40 ? <small>{conversation.conversation.message}</small> : <small>{conversation.conversation.message.slice(0,37) + '...'}</small> }
          </Grid>


          <Grid
            container
            style = {{width : '15%',paddingBottom : 10}}
            direction = 'column'
            justify = 'flex-end'
            alignItmes = 'flex-end'
          >
              <div style = {{backgroundColor : 'blue',borderRadius : 25,height : '1.1em',width : '1.1em',textAlign : 'center'}}>

                <Badge badgeContent={conversation.unread_mesages} color="primary"/>
              </div>

          </Grid>


    </Grid>
  )




    return(
      <Grid
        className = {style.container}
        onClick = {handleClick}
      >
      {conversation.unread_mesages > 0 ? <Unread /> : <Read />}
      </Grid>
    );
  }

export default React.memo(ConversationItem);
