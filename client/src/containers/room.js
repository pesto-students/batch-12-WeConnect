import React from 'react';

import { RoomCard, RoomContent } from '../components/RoomCard';
import { Carousel, Button } from '../components/Generic';
import Amenities from '../components/Amenities/Amenities';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

function Room(props) {
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
  const {operationHours} = props.operationHours;
  const [monOpHr, tueOpHr, wedOpHr, thuOpHr, friOpHr, satOpHr, sunOpHr] = operationHours;

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
        defaultValue={[10, 20]}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="on"
        step={10}
        marks
        min={10}
        max={110}
      />
      <Button color="primary" variant="contained" fullWidth={true}>
        Book Room
      </Button>
    </RoomCard>
  );
}

export default Room;
