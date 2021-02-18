import React,{useEffect,useRef} from 'react';
import {makeStyles,Paper,Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';


const newStyle = makeStyles(()=>({
  container : {
    display : 'flex',
    flex : 1,
    flexWrap : 'nowrap',
    height : '100%',
    flexDirection : 'column',
    justifyContent : 'flex-end',
    overflowY: 'scroll',
    scrollbarWidth : 'none',

  },
  conversation : {
    display : 'flex',
    flex : 'auto',
    flexDirection : 'column',
    justifyContent : 'flex-end',
    flexWrap : 'nowrap',
    backgroundColor : 'white',
  //  height : 500

  },
  sent : {
    padding : 10,
    backgroundColor : '#056162',
    marginTop : 5,
    color : 'white'

  },
  recieved : {
    padding : 10,
    backgroundColor : '#495867',
    margin : 5,
    color : 'white'
  }

}))


const Chat = ()=>{

  const [id,messages] = useSelector((state)=> [state.id,state.messages]);
  const style = newStyle();
  const divRef = useRef(null);



  const msgItem = (el)=>{
    if(el.sender_id === id._id){
      return(
        <Grid
          container
          direction = 'row'
          justify = 'flex-end'

        >
          <Paper className = {style.sent}>
            <p>{el.message}</p>
          </Paper>
        </Grid>
      )
    }else{
      return(

        <Grid
          container
          direction = 'row'
          justify = 'flex-start'
        >
          <Paper className = {style.recieved}>
          <p>{el.message}</p>
          </Paper>
        </Grid>
      )
    }
  }


  useEffect(()=>{
    divRef.current.scrollTop = divRef.current.scrollHeight
  },[messages]);

  return (



    <div className = {style.container} ref = {divRef}>
      <div style = {{maxHeight : '100%'}}>

        <Grid
          container
          direction = 'column'
          justify = 'flex-end'

        >

            {messages.map((el)=>(msgItem(el)))}
          </Grid>




        </div>
      </div>
  );
}


export default Chat;
