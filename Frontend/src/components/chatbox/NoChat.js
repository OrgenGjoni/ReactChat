import React from 'react';
import {makeStyles,Grid} from '@material-ui/core';
import { BsChatSquareDots } from 'react-icons/bs';


const newStyle = makeStyles(()=>({
  container : {
    display : 'flex',
    flex : 1,
    height : '100%',
    color : '#a8c0ba',
    fontSize : '1.5em'

  },


}))

const NoChat = ()=>{

  const style = newStyle();

  return(
    <Grid
    container
    className = {style.container}
    alignItems = 'flex-start'
    justify = 'center'
    >
      <Grid container
        direction = 'row'
        alignItems = 'center'
        justify = 'center'
        style = {{ margin : 'auto'}}
      >
          <Grid container
          direction = 'column'
          justify = 'center'
          alignItems = 'center'
          >
          <BsChatSquareDots size = {'8em'} color = {'#a8c0ba'}/>
          <span>No Conversation</span>
          </Grid>
      </Grid>

    </Grid>
  );
}

export default NoChat;
