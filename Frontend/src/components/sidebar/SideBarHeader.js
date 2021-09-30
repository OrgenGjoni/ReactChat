import React,{useState} from 'react';
import {makeStyles,Grid,Avatar,MenuItem,Menu} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {FiLogOut} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import socket from '../../socket';

const newStyle = makeStyles(()=>({
  avatar : {
    backgroundColor : '#118ab2',
    marginRight : 10,
    cursor: 'pointer'
  },
  header : {
    height : '3em',
    width : '100%'
  },
  menuItem : {
    fontSize : '1em',
    height : 30,
    fontWeight: 500
  }
}));

const SideBarHeader = ()=>{

  const id = useSelector((state)=>state.id)
  const style = newStyle();
  const history = useHistory();
  const [anchor,setAnchor] = useState(null);

  const handleOpen = (e)=>{
    setAnchor(e.currentTarget)
  }

  const handleClose = ()=>{
    setAnchor(null);
  }

  const logOut = ()=>{
    handleClose();
    localStorage.clear();
    history.push('/');
    socket.emit('log_out',id);
  }

  const SignOut = ()=>(
    <Menu
      anchorEl={anchor}
      open = {!!anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style:{
          backgroundColor: '#118ab2',
          color: '#fff',
          width:150
        }
      }}
    >
        <MenuItem>{id.name} </MenuItem>
        <MenuItem className = {style.menuItem} onClick = {logOut}>
            <FiLogOut size = {20} color = {"white"}/>
            <p>Log Out</p>
        </MenuItem>
    </Menu>
  );

  return(
    <React.Fragment>
    <Grid
      container
      direction = 'row'
      justifyContent = 'flex-start'
      alignItmes = 'center'
      className = {style.header}
    >
      <Avatar onClick = {handleOpen} className = {style.avatar}>
        {id.name && id.name[0]}
      </Avatar>
      <span style = {{fontSize : '1.7em'}}>{id.name}</span>

    </Grid>
    <SignOut />
    </React.Fragment>
  );
}

export default SideBarHeader
