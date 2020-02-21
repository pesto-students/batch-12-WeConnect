import React, { useState } from 'react';

import style from './Homepage.module.css';

import { Grid, Button, TextField } from '../../components/Generic';

const Homepage = (props) => {
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const validateSearch = (event) => {
    let { value } = event.target;
    if (event.target.value.length < 3) {
      setHelperText('Enter Atleast 3 char');
      setError(true);
    } else {
      setHelperText('');
      setError(false);
      setSearchTerm(value);
    }
  };

  const redirectToWorkspace = async (event) => {
    if (searchTerm.length > 2) {
      setSearchTerm({ disableButton: true, searchButtonText: 'Loading...' });
      props.history.push(`/workspace?q=${searchTerm}`);
    }
  };

  return (
    <section className={style.searchContainer}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={style.searchContent}
      >
        <h1>Beat The Hassle Of Booking A Meeting Room</h1>
        <p>Book Meeting Room In Top Notch Co-Working Space</p>
        <div className={style.searchWrapper}>
          <TextField
            id="searchInput"
            style={{ backgroundColor: '#fff' }}
            error={error}
            helperText={helperText}
            placeholder="Enter Your City"
            fullWidth
            variant="outlined"
            type="text"
            autoFocus={true}
            className="input"
            onChange={validateSearch}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: 0,
              position: 'absolute',
              right: '-1px',
              padding: '15px 42px',
            }}
            size="large"
            onClick={redirectToWorkspace}
            type="submit"
            id="homeButton"
          >
            Search
          </Button>
        </div>
      </Grid>
    </section>
  );
};

export default Homepage;
