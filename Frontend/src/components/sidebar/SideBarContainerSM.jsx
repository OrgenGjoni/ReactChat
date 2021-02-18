import React from 'react';
import {makeStyles,Grid,SwipeableDrawer} from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import {toggleSidebar,clearNotifications} from '../../store/actions';
import SideBarList from './SideBarList';
import SideBarHeader from './SideBarHeader';



const newStyle = makeStyles(()=>({
  sidebar : {
    width : '100%',
    backgroundColor : '#131c21',
    height : '100vh',
    color : '#a8c0ba',
    padding : 10
  },
  floatingBtn : {
    position : 'absolute',
    left : 30,
    top : 100,
  }
}))



const SideBarContainer = ()=>{
const style = newStyle();
const dispatch = useDispatch();

const open = useSelector(state => state.sidebarOpen);

const handleToggle = ()=>{
  dispatch(toggleSidebar());
  dispatch(clearNotifications());
}

  return (


    <SwipeableDrawer
      open = {open}
      onClose = {handleToggle}
    >
          <Grid
          container
          direction = 'column'
          justify = 'flex-start'
          className = {style.sidebar}
          >
            <SideBarHeader />
            <SideBarList />

          </Grid>
    </SwipeableDrawer>

  );
}

export default SideBarContainer;
