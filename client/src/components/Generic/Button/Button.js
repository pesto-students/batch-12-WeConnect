import React from 'react';
import {Button} from '@material-ui/core';

function myButton(props) {
    return <Button {...props}> {props.children}</Button>
}

export default myButton;
