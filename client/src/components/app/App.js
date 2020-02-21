import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import style from './App.module.css';
import { Homepage, WorkSpaceList, Login } from '../../views';
import { Navbar } from '../Navbar/Navbar';

const App = () => {
  const websiteTitle = 'WeConnect';
  return (
    <Router>
      <div className={style.App}>
        <Navbar position="sticky" titleText={websiteTitle} className="Appbar" />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route path="/workspace" component={WorkSpaceList} />
        </Switch>
      </div>
    </Router>
  );
};

/*
TO BE IMPLEMENTED ROUTES
/forgot-password : Forgot Password
*/

export default App;
