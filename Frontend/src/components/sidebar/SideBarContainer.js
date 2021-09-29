import React from 'react';
import {makeStyles,Grid} from '@material-ui/core';
import SideBarList from './SideBarList';
import SideBarHeader from './SideBarHeader';

const newStyle = makeStyles(()=>({
  sidebar : {
    width : '25%',
    backgroundColor : '#131c21',
    height : '100vh',
    color : '#a8c0ba',
    padding : 10
  }
}));

const SideBarContainer = ()=>{
const style = newStyle();

  return (
    <Grid
    container
    direction = 'column'
    justifyContent = 'flex-start'
    className = {style.sidebar}
    >
      <SideBarHeader />
      <SideBarList />

    </Grid>

  );
}

export default SideBarContainer;
