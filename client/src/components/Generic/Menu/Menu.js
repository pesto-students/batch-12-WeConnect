import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

function customMenu(props) {
  return <Menu {...props}></Menu>;
}

function customMenuItem(props) {
  return <MenuItem {...props} />;
}

export { customMenu, customMenuItem };
