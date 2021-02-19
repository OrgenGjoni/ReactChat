import React,{useState,useEffect} from 'react';
import {makeStyles,Container,Paper,Grid,Typography,TextField,Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useHistory,Link} from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';

const newStyle = makeStyles(()=>({
  container : {
    margin : 'auto',
    width : '100vw',
    height : '100vh',
    backgroundColor : '#2d6a4f'

  },
  tab : {
    padding : '5em',
    width : '80%',
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
    minWidth : 300


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

const LogIn = ()=>{

  const style = newStyle();
  const history = useHistory();
  const SERVER = process.env.REACT_APP_SERVER_ADDRESS;
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [err, setErr] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();

    const url = SERVER + '/login';
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
          if(typeof res.token != 'undefined'){
            localStorage.setItem('token',res.token);
            history.push('/chat');
          }else{
            setErr(res.message);
          }
        })
      .catch((err)=>{console.log(err)})
  }



  useEffect(()=>{

    if( localStorage.getItem('token') != null){

      history.push('/chat');
    }else{

      history.push('/');
    }
  },[])



  return(
    <Container maxWidth='xl' component = 'main' className = {style.container}>
      <Grid className = {style.tab}
        direction = 'row'
        container
        justify = 'center'
        alignItems = 'center'
      >
        <Paper>
          <form>
              <div className = {style.paper}>
                  <AiOutlineUser size = {30}/>
                  <Typography component="h1" variant="h5">
                    Sign in
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
                  onChange = {(e)=>{setUsername(e.target.value)}}
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
                  onChange = {(e)=>{setPassword(e.target.value)}}
                  />

                    {err && <Alert severity="warning"> {err} </Alert>}
                  <Link to = {'/signup'} className = {style.link}> Register now </Link>


                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className = {style.button}
                  onClick = {(e)=>{handleSubmit(e)}}
                  >
                    Sign In
                  </Button>


                </div>
            </form>

        </Paper>
      </Grid>
    </Container>
  );
}

export default LogIn;
