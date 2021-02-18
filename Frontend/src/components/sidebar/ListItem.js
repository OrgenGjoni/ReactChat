import React from 'react';
import {makeStyles,Grid} from '@material-ui/core';
import {BiUserCircle} from 'react-icons/bi';

const newStyle = makeStyles(()=>({
  container : {
    height : '4em',
    borderBottom: '1px solid #30383d',
    fontSize : '1.2em',
    padding : 5,
    cursor : 'pointer',
    '&:hover' : {
      backgroundColor : '#323739'
    }
    }
}))

const ListItem = ({user,selectOnlineUser,loadMessages,closeSlide})=>{

  const style = newStyle();

  const handleClick = ()=>{
    selectOnlineUser(user);
    closeSlide();
  }

    return(
        <Grid
          container
          direction = 'row'
          alignItems = 'center'
          justify = 'flex-start'
          className = {style.container}
          onClick = {handleClick}
        >

              <BiUserCircle size = {30}/>

              <p>{user.username}</p>
        </Grid>
    );
  }

export default ListItem;
