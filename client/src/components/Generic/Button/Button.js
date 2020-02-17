import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const myButton = props => {
  return <Button {...props}> {props.children}</Button>;
};

myButton.propTypes = {
  children: PropTypes.element.isRequired
};

export default myButton;
