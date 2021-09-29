import React from 'react';
import{makeStyles,Fab,Badge} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import {toggleSidebar} from '../../store/actions';
import {FaListAlt} from 'react-icons/fa';
import {AiOutlineMessage} from 'react-icons/ai';


const newStyle = makeStyles(()=>({
  fab : {
    position : 'absolute',
    right : 10
  }
}))

const SideBarFAB = ()=>{
  const dispatch = useDispatch();
  const style = newStyle();

  const newNotification = useSelector(state => state.newMessageNotification);

  const handleToggle = ()=>{
    dispatch(toggleSidebar());
  }
  return(
    <Fab size = 'small' onClick = {handleToggle} className = {style.fab}>
      {newNotification !== 0  ? <Badge  badgeContent={newNotification} color="primary" ><AiOutlineMessage size = {25} color = {'#118ab2'}/></Badge> : <FaListAlt size = {25} color = {'#118ab2'}/>}
    </Fab>
  );
}

export default SideBarFAB;
