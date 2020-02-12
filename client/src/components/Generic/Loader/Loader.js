import React from "react";
import { CircularProgress } from "@material-ui/core";

function myLoader(props) {
  return <CircularProgress {...props} />;
}

export default myLoader;
