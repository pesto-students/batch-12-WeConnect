import React from 'react';
import WeGrid from '../../components/Generic/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  filterBox: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    margin: '10px 0',
    width: '100%',
    position: 'relative',
  },
  button: {
    fontSize: 10,
    marginTop: '5px',
    height: '40px',
    position: 'absolute',
    right: '20px',
  },
}));

const Filter = (props) => {
  const searchValue = props.valueOfSearch.searchText;
  const classes = useStyles();

  const updateText = (e) => {
    props.valueOfSearch.setSearchText(e.target.value);
  };

  return (
    <WeGrid className={classes.filterBox} container spacing={3}>
      <WeGrid item xs={12}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-search">{props.filterFor}</InputLabel>
          <OutlinedInput
            id="outlined-search"
            value={searchValue}
            onChange={updateText}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
        <Button
          onClick={props.updateSearch}
          variant="contained"
          color="primary"
          className={classes.button}
          aria-label="search"
        >
          Search
        </Button>
      </WeGrid>
      {props.children}
    </WeGrid>
  );
};

export default Filter;
