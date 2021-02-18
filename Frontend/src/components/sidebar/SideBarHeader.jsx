import React,{useState} from 'react';
import {makeStyles,Grid,Avatar,MenuItem} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {FiLogOut} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import socket from '../../socket';

const newStyle = makeStyles(()=>({
  avatar : {
    backgroundColor : '#118ab2',
    marginRight : 10
  },
  header : {
    height : '3em',
    width : '100%'
  },
  signOut : {
    position : 'absolute',
    zIndex : 100,
    backgroundColor : '#118ab2',
    left : '3.3em',
    top : 10,
    borderRadius : 10,
    width : 150,
    padding : 5

  },
  menuItem : {
    fontSize : '1em',
    height : 30
  }
}))

const SideBarHeader = ()=>{

  const id = useSelector((state)=>state.id)
  const style = newStyle();
  const history = useHistory();
  const [open,setOpen] = useState(false);

  const handleToggle = ()=>{
    setOpen(!open)

  }


  const logOut = ()=>{

    localStorage.clear();
    history.push('/');
    socket.emit('log_out',id);
  }



  const SignOut = ()=>(
    <Grid
      container
      className = {style.signOut}
    >
      <MenuItem>{id.name} </MenuItem>
      <MenuItem className = {style.menuItem} onClick = {logOut}>

          <FiLogOut size = {20} color = {"white"}/>
          <p>Log Out</p>
      </MenuItem>
    </Grid>
  )



  return(
    <React.Fragment>
    <Grid
      container
      direction = 'row'
      justify = 'flex-start'
      alignItmes = 'center'
      className = {style.header}

    >
      <Avatar onClick = {handleToggle} className = {style.avatar}>
        {id.name && id.name[0]}
      < /Avatar>
      <span style = {{fontSize : '1.7em'}}>{id.name}</span>

    </Grid>
    {open && <SignOut />}
    </React.Fragment>
  );
}

export default SideBarHeader
