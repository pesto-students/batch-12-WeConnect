import React from 'react';

import PeopleIcon from '@material-ui/icons/People';

import style from './Room.module.css';

export const RoomCard = (props) => {
  const [
    Carousel,
    RoomContent,
    Amenities,
    BookingSlider,
    BookRoom,
    ...restProps
  ] = props.children;
  return (
    <div className={style.room} style={props.style} key={props.id}>
      {Carousel}
      <div className={style.roomContent}>
        {RoomContent}
        {Amenities}
        {BookingSlider}
        {BookRoom}
        {restProps}
      </div>
    </div>
  );
};

export const RoomContent = (props) => {
  return (
    <>
      <p className={style.roomTitle}>{props.name}</p>
      <div className={style.roomCapacity}>
        <span>
          <PeopleIcon fontSize="small" color="primary" />{' '}
          <span>{props.maxSeat} seats</span>
        </span>
      </div>
    </>
  );
};
