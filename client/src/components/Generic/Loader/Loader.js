import React from "react";
import { CircularProgress } from "@material-ui/core";

const myLoader = props => {
  return <CircularProgress {...props} />;
};

export default myLoader;
