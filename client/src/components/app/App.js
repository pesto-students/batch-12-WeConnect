import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Homepage from '../../views/Homepage';
import WorkSpaceList from '../../views/WorkSpaceList';

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">App</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/workspace" component={WorkSpaceList} />
      </Switch>
    </Router>
  );
};

export default App;
