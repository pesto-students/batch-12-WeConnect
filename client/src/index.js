import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { MuiThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import theme from './components/Theme/theme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
