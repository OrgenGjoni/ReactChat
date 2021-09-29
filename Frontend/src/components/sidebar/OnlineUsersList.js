import React from 'react';
import {makeStyles,Grid} from '@material-ui/core';
import ListItem from './ListItem';

const newStyle = makeStyles(()=>({
  container : {
    borderBottom : '4px solid #323739',
    backgroundColor : '#0d1418',
    padding : 0,
    marginTop : 0,
    borderRadius : 5
  }
}));

const OnlineUsersList = ({closeSlide,onlineUsers,id,selectOnlineUser,loadMessages})=>{

  const style = newStyle();
  const showUSers = (el)=>{
    if(el.user_id !== id._id){
      return <ListItem user = {el} selectOnlineUser = {selectOnlineUser} loadMessages = {loadMessages} closeSlide = {closeSlide}/>
    }else{
      return null;
    }
  }

  return(
    <Grid container
      className = {style.container}
    >
        {onlineUsers.map((el)=>(showUSers(el)))}

    </Grid>
  );
}

export default OnlineUsersList;
