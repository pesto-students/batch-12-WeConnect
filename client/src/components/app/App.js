import React, { useContext } from 'react';
import { Homepage, WorkSpaceList, Login } from '../../views';
import WorkspaceCrud from '../../views/WorkspaceCRUD';
import { Navbar } from '../Navbar/Navbar';
import AuthContext from '../../store/authContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
          <Route exact path="/workspace" component={WorkSpaceList} />
          <Route path="/room" component={RoomList} />
          <PrivateRoute exact path="/profile">
            <MyProfile />
          </PrivateRoute>
          <PrivateRoute exact path="/bookings">
            <MyBookings />
          </PrivateRoute>
          <PrivateRoute exact path="/add/workspace">
            <WorkspaceCrud />
          </PrivateRoute>
          <Route
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const { userAuthStatus } = useContext(AuthContext);
  console.log(userAuthStatus);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuthStatus ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
/*
TO BE IMPLEMENTED ROUTES
/forgot-password : Forgot Password
*/

export default App;
