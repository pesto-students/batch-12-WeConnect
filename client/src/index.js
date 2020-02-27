import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import './index.css';
import App from './components/app/App';
import { MuiThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import theme from './components/Theme/theme';
import { axiosHOC } from './apis/axios_hoc';
import AuthContext from './store/authContext';
import { verifyUserAuthStatus } from './apis/auth';
dotenv.config();

const AppHOC = axiosHOC(App);


const AppWrapper = () => {
  const [userAuthStatus, _setUserAuthStatus] = useState(null);
  const setUserAuthStatus = (status) => {
    sessionStorage.setItem('userAuthStatus', status);
    _setUserAuthStatus(status)
  }

  if (userAuthStatus === null) {
    const status = sessionStorage.getItem('userAuthStatus');
    let newState = null;
    switch(status) {
      case "true":
        newState = true;
        break;
      case "false":
        newState = false;
        break;
      case null:
        verifyUserAuthStatus();
        break;
      default:
        newState = false;
    }
    if (userAuthStatus !== newState) {
      setUserAuthStatus(newState);
    }
    
  }

  return ( 
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AuthContext.Provider value={{userAuthStatus, setUserAuthStatus} }>
          <AppHOC />
        </AuthContext.Provider>
        </StylesProvider>
      </MuiThemeProvider>
  );
}


ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root'),
);

