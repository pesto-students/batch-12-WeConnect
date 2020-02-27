import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 300,
  },
  bold: {
    fontWeight: 600,
  },
}));

export default function BookingsGrid(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>Location: </span>
          {props.booking.locationName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>Workspace: </span>
          {props.booking.workspaceName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>Floor: </span>
          {props.booking.floorName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>Room: </span> {props.booking.roomName}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>From: </span>
          {moment(props.booking.meetingStartTime).format('MM/DD/YYYY hh:mm A')}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <span className={classes.bold}>To: </span>
          {moment(props.booking.meetingEndTime).format('MM/DD/YYYY hh:mm A')}
        </Typography>
      </Paper>
    </div>
  );
}
