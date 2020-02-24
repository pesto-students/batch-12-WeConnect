import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import style from './Navbar.module.css';
import { Button } from '../Generic';
import { Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '../icons';
import AuthContext from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../apis/auth';

export const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userAuthStatus, setUserAuthStatus } = useContext(AuthContext);
  const history = useHistory();

  const toggleDropDown = (event) => {
    const newAnchorEl =
      event && event.currentTarget ? event.currentTarget : null;
    setAnchorEl(newAnchorEl);
  };

  const closeDropDown = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    closeDropDown();
    history.push('/profile');
  };

  const handleLogoutClick = () => {
    const isSuccessful = logoutUser();
    if (isSuccessful) {
      setUserAuthStatus(false);
    } else {
      setUserAuthStatus(null);
    }
  };

  const LoggedInMenu = (
    <React.Fragment>
      <div>
        <IconButton onClick={toggleDropDown}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeDropDown}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
        >
          <MenuItem className={style.menuButton} onClick={handleProfileClick}>
            Profile
          </MenuItem>
          <MenuItem className={style.menuButton} onClick={handleLogoutClick}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );

  const DefaultMenu = (
    <React.Fragment>
      <div>
        <Button color="inherit" href="/login">
          <Typography variant="button" component="h6">
            Login
          </Typography>
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <AppBar
      position={props.position}
      className={style.appBar + ' ' + props.className}
    >
      <Toolbar>
        <a href="/" className={style.title} aria-label="Homepage Link">
          <Typography variant="h6">{props.titleText}</Typography>
        </a>
        <div className={style.childrenComponents}>{props.children}</div>
        <div className={style.profileMenu + ' profileMenu'}>
          {userAuthStatus ? LoggedInMenu : DefaultMenu}
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  position: PropTypes.string,
  color: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  titleText: PropTypes.string,
  className: PropTypes.string,
};

Navbar.defaultProps = {
  position: 'static',
  titleText: 'WeConnect',
  isLoggedIn: false,
  className: '',
  color: '',
};
