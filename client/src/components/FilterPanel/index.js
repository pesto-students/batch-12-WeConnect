import React from 'react';
import WeGrid from '../../components/Generic/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    margin: '10px 0',
    width: '100%',
  },
}));

const Filter = (props) => {
  console.log(props);
  const classes = useStyles();
  return (
    <WeGrid className={classes.filterBox} container spacing={2}>
      <WeGrid item xs={12}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-search">{props.filterFor}</InputLabel>
          <OutlinedInput
            id="outlined-search"
            value={props.valueOfSearch}
            onChange={console.log('change')}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
      </WeGrid>
      {props.children}
    </WeGrid>
  );
};

export default Filter;
