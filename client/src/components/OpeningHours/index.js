import React from 'react';
import PopOver from '../Generic/Popover';
import Grid from '../Generic/Grid/Grid';

const DaysRow = (props) => {
  const { operationHours = [] } = props;

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <Grid container justify="space-evenly">
      {days.map((day, index) => {
        return (
          <Grid item xs={1}>
            <PopOver day={day} timings={operationHours[index] || 'closed'} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DaysRow;
