import React, { useState, useEffect } from 'react';
import getBookings from '../../apis/getBookings';
import Grid from '@material-ui/core/Grid';
import Bookings from '../../components/Bookings/Bookings';
import ownStyle from './MyBookings.module.css';

const MyBookings = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState();
  const [hasBookings, setHasBookings] = useState(false);

  useEffect(() => {
    getBookings().then((response) => {
      if (response.data.length !== 0) {
        setHasBookings(!hasBookings);
        setBookings(response.data);
      }
      setIsLoading(!isLoading);
    });
  }, [hasBookings, isLoading]);

  return (
    <div className={ownStyle.mainView}>
      <h2>Bookings:</h2>
      {isLoading ? (
        <img src="/loader.svg" alt="A loader SVG" className={ownStyle.loader} />
      ) : hasBookings ? (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Bookings booking={booking} />
          ))}
        </Grid>
      ) : (
        <h3 className={ownStyle.noBookings}>No bookings available!</h3>
      )}
    </div>
  );
};

export default MyBookings;
