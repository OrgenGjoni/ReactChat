import React from 'react';
import {makeStyles,withWidth,Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SideBarFAB from './SideBarFAB';
import _ from 'lodash';


const newStyle = makeStyles(()=>({
  container : {
    color : 'white',
    height : '3em',
    paddingLeft : 20,
    backgroundColor : '#18363f'
  }
}));


const ChatHeader = ({width})=>{

  const [activeChat,activeUser] = useSelector((state)=> [state.activeChat,state.activeUser]);
  const style = newStyle();

  return (
      <React.Fragment>
      <Grid
        container
        direction = 'row'
        alignItmes = 'center'
        justifyContent = 'space-between'
        className = {style.container}
      >

        {activeChat ? _.map(activeChat.partecipants,(el)=>(<p>{el.username + ' '}</p>)) : null }
        {activeUser ? <p>{activeUser.username}</p> : null }
        {(width === 'xs' || width === 'sm' || width === 'ms' ) && <SideBarFAB />}
      </Grid>

    </React.Fragment>
  );
}

export default withWidth()(ChatHeader);
