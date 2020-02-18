import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import style from './Navbar.module.css';
import { Button } from '../Generic';
import { Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '../icons';

export const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoggedIn } = props;

  const toggleDropDown = (event) => {
    const newAnchorEl =
      event && event.currentTarget ? event.currentTarget : null;
    setAnchorEl(newAnchorEl);
  };

  const closeDropDown = () => {
    setAnchorEl(null);
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
          <MenuItem className={style.menuButton} onClick={closeDropDown}>
            Profile
          </MenuItem>
          <MenuItem className={style.menuButton} onClick={closeDropDown}>
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
          {isLoggedIn ? LoggedInMenu : DefaultMenu}
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
