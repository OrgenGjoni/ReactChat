import React,{useState,useEffect} from 'react';
import {makeStyles,Container,Paper,Grid,Typography,TextField,Button,CircularProgress} from '@material-ui/core';
import {Alert} from '@material-ui/lab/';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';
import {AiOutlineUserAdd} from 'react-icons/ai';

const newStyle = makeStyles(()=>({
  container : {
    width : '100vw',
    height : '100vh',
    backgroundColor : '#2d6a4f'

  },
  tab : {

    padding : '5em',
    width : '40%',
    height : '100%',
    minWidth : 300,
    margin : 'auto'

  },
  paper : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify : 'center',
    padding : 20,
    margin : 'auto',
    minWidth : 400

  },
  link : {
    fontSize : '0.8em',
    color : 'blue',
    padding : '0.5em',
    textDecoration : 'none'
  },
  button : {
    width : '10em'
  }

}));



const SignUp = ()=>{

  const style = newStyle();
  const SERVER = process.env.REACT_APP_SERVER_ADDRESS;

  const alertList = {
    username : 'Username must be at least 6 characters',
    password : 'Password must be at least 6 characters',
    match    : 'Password does not match',
    taken_username : 'Username is already taken'
  }

  const history = useHistory();
  const [username,setUsername] = useState(false);
  const [password,setPassword] = useState(false);
  const [alert,setAlert] = useState([]);
  const [response,setResponse] = useState([]);



  const usernameChange = (e)=>{
    if(e.target.value.length < 6 ){
      setUsername(false);
      const newAlert = _.filter(alert,(el)=>{return el !== alertList.username})
      setAlert([...newAlert,alertList.username]);
    }else{

      const newAlert = _.filter(alert,(el)=>{return el !== alertList.username})
      setAlert(newAlert);
      setUsername(e.target.value);
    }
  }

  const passwordChange = (e)=>{
    if(e.target.value.length < 6 ){
      setPassword(false);
       const newAlert = _.filter(alert,(el)=>{return el !== alertList.password})
       setAlert([...newAlert,alertList.password]);
    }else{

      const newAlert = _.filter(alert,(el)=>{return el !== alertList.password})
      setAlert(newAlert);
      setPassword(e.target.value);
    }
  }

  const passwordMatch = (e)=>{

    if(e.target.value !== password ){
      const newAlert = _.filter(alert,(el)=>{return el !== alertList.match})
      setAlert([...newAlert,alertList.match]);
    }else{
      const newAlert = _.filter(alert,(el)=>{return el !== alertList.match})
      setAlert(newAlert);
      
    }
  }

  const usernameCheck = (res)=>{

    const resAlert = _.find(res,(el)=>{return el.msg === alertList.taken_username});

    if(typeof resAlert != 'undefined'){
      const newAlert = _.filter(alert,(el)=>{return el !== alertList.taken_username})
      setAlert([...newAlert,alertList.taken_username]);
    }else{
      const newAlert = _.filter(alert,(el)=>{return el !== alertList.taken_username})
      setAlert(newAlert);
    }
  }



  const showAlerts = (alert)=>(
    <Alert severity="warning" >{alert}</Alert>
  );




  const handleSubmit = (e)=>{
    e.preventDefault();

    if(username && password){

      const url = SERVER + '/signup';
      const headers = new Headers();
      headers.append('Accept' ,'application/json');
      headers.append('Content-Type','application/json');

      const body = {
        username : username,
        password : password
      }

      fetch(url,{
        method : 'POST',
        mode : 'cors',
        headers : headers,
        body : JSON.stringify(body)
      })
      .then((res)=>{return res.json()})
      .then((res)=>{
            setResponse(res);
            usernameCheck(res.error);
      })
      .catch((err)=>{console.log(err)});

    }else{
      console.log('Oopsiee...');
    }
  }




  useEffect(()=>{
    let tOut;
    if(response.message === 'New account successfully created'){
        const reDir = ()=>{ history.push('/')};
        tOut = setTimeout(reDir,3000);
    }


  },[response]);

  return(
    <Container maxWidth='xl' component = 'main' className = {style.container}>
      <Grid className = {style.tab}
        container
        justify = 'center'
        alignItems = 'center'
      >
        <Paper >
          <form>
              <div className = {style.paper}>
                  <AiOutlineUserAdd size = {30} />
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>

                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  autoComplete="current-username"
                  onChange = {(e)=>{usernameChange(e)}}
                  />


                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange = {(e)=>{passwordChange(e)}}
                  />

                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="passwordre"
                  onChange = {(e)=>{passwordMatch(e)}}
                  />



                  {alert.map((element)=>showAlerts(element))}
                  {typeof response.message != 'undefined' && <CircularProgress size = {25}/>}
                  {typeof response.message != 'undefined' && <Alert severity="success" >{response.message}</Alert>}

                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className = {style.button}
                  onClick = {(e)=>{handleSubmit(e)}}
                >
                  Sign Up
                </Button>


                </div>
            </form>

        </Paper>
      </Grid>
    </Container>
  );
}

export default SignUp;
