import React, { useState } from 'react';

import { RoomCard, RoomContent } from '../components/RoomCard';
import { Carousel, Button } from '../components/Generic';
import Amenities from '../components/Amenities/Amenities';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

function Room(props) {
  const [timeSlot, setTimeSlot] = useState([0, 90]);
  const WeSlider = withStyles({
    root: {
      color: '#ccc',
      height: 40,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    mark: {
      backgroundColor: '#FFC400',
      height: 24,
      width: 1,
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    markLabel: {
      top: 38,
      fontSize: '10px',
    },
    track: {
      color: '#009688',
      height: 24,
      borderRadius: 0,
    },
    rail: {
      height: 24,
      borderRadius: 0,
    },
  })(Slider);

  const marks = [];

  const { operationHours } = props;

  const getTodayOpHr = (operationHours) => {
    let curDay = (props.day + 6) % 7;
    return operationHours[curDay];
  };

  const todayOperationHour = getTodayOpHr(operationHours);

  const updateTimeSlot = (e, newValue) => {
    setTimeSlot(newValue);
  };

  const generateMarks = (operationHours) => {
    let [startTime, endTime] = operationHours
      .split('-')
      .map((eachWord) => eachWord.trim());
    marks.push({ value: 0, label: startTime });
    let startVal = 0;
    while (startTime !== endTime) {
      let [hourStart, minuteStart] = startTime.split(':');
      minuteStart = parseInt(minuteStart, 10);
      hourStart = parseInt(hourStart, 10);
      if (minuteStart === 0) {
        minuteStart = 30;
        hourStart =
          hourStart < 10 ? ('0' + hourStart).slice(-2) : String(hourStart);
        minuteStart = String(minuteStart);
      } else {
        hourStart = hourStart + 1;
        minuteStart = '00';
        hourStart =
          hourStart < 10 ? ('0' + hourStart).slice(-2) : String(hourStart);
      }
      startTime = hourStart + ':' + minuteStart;

      startVal += 30;
      if (timeSlot.includes(startVal)) {
        marks.push({
          value: startVal,
          label: startTime,
        });
      } else {
        marks.push({
          value: startVal,
        });
      }
    }
  };

  generateMarks(todayOperationHour);

  return (
    <RoomCard id={props.rooms._id}>
      {props.rooms.images.length === 0 ? (
        ''
      ) : (
        <Carousel showArrows={true} showThumbs={false} autoPlay emulateTouch>
          {props.rooms.images.map((imgURL) => {
            return (
              <div key={props.rooms.images.indexOf(imgURL)}>
                <img src={imgURL} alt="workspace" />
              </div>
            );
          })}
        </Carousel>
      )}

      <RoomContent
        name={props.rooms.name}
        maxSeat={props.rooms.capacity || '0'}
      />
      <Amenities>
        {props.rooms.amenities.map((amenity) => {
          return <p key={amenity}>{amenity}</p>;
        })}
      </Amenities>
      <WeSlider
        value={timeSlot}
        aria-labelledby="meeting-room"
        valueLabelDisplay="auto"
        step={30}
        marks={marks}
        min={0}
        max={marks[marks.length - 1].value}
        onChange={updateTimeSlot}
      />
      <Button color="primary" variant="contained" fullWidth={true}>
        Book Room
      </Button>
    </RoomCard>
  );
}

export default Room;
