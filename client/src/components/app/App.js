import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import style from './App.module.css';
import { Homepage, WorkSpaceList } from '../../views';
import { Navbar } from '../Navbar/Navbar';

const App = () => {
  const websiteTitle = 'WeConnect';
  return (
    <Router>
      <div className={style.App}>
        <Navbar position="fixed" titleText={websiteTitle} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/workspace" component={WorkSpaceList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
