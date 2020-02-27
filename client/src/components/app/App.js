import React from 'react';
import { Homepage, WorkSpaceList, Login } from '../../views';
import WorkspaceCrud from '../../views/WorkspaceCRUD';
import { Navbar } from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RoomList from '../../views/RoomList';
import MyProfile from '../../views/MyProfile';
import MyBookings from '../../views/MyBookings';
import style from './App.module.css';

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
          <Route path="/room" component={RoomList} />
          <Route path="/profile" component={MyProfile} />
          <Route path="/bookings" component={MyBookings} />
          <Route path="/add/workspace" component={WorkspaceCrud} />
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
