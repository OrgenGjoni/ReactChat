import React from 'react';
import LogIn from './LogIn';
import ChatMain from './ChatMain';
import SignUp from './SignUp';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import store from './store';


function App() {


  return (
    <React.Fragment>
    <CssBaseline />
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route path = '/' exact component = {LogIn} />
          <Route path = '/chat' exact component = {ChatMain} />
          <Route path = '/signup' exact component = {SignUp} />
        </Switch>
      </Router>
    </Provider>
    </React.Fragment>

  );
}

export default App;
