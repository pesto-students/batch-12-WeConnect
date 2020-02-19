import React, { useState } from 'react';

import style from './Homepage.module.css';

import { Grid, Button, TextField } from '../../components/Generic';
import { getWorkSpaceData } from '../../apis/getWorkSpace';

const Homepage = (props) => {
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const validateSearch = (event) => {
    let { value } = event.target;
    if (event.target.value.length < 3) {
      setHelperText('Enter atleast 3 char');
      setError(true);
    } else {
      setHelperText('');
      setError(false);
      setSearchTerm(value);
    }
  };

  const getWorkSpace = async (event) => {
    if (searchTerm.length > 2) {
      event.target.setAttribute('disabled', true);
      const data = await getWorkSpaceData();
      if (data.status === 'success') {
        props.history.push({
          pathname: '/workspace',
          state: {
            workspaces: data.workspaces,
          },
        });
      }
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
            onClick={getWorkSpace}
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
