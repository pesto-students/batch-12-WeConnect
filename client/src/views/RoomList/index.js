import React, { useState, useEffect } from 'react';
import LinearProgress from '../../components/Generic/ProgressBar/LinearProgress';
import getRoomData from '../../apis/getRooms';
import { Container, Grid } from '../../components/Generic';
import Room from '../../containers/room';

import style from './RoomList.module.css';

const RoomList = (props) => {
  console.log('roomliong', props);
  const [floors, setFloors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRoomData(props.location.pathname).then((floorsData) => {
      console.log(floorsData);
      setIsLoading(false);
      setFloors(floorsData);
    });
  }, [props.location.pathname]);

  return (
    <section>
      {isLoading ? <LinearProgress /> : ''}
      <Container fixed>
        {floors.map((eachFloor) => {
          if (eachFloor.rooms.length < 1) {
            return null;
          }
          return (
            <section className={style.floorSection} key={eachFloor._id}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <p className={style.floorName}>{eachFloor.name}</p>
                </Grid>
                {eachFloor.rooms.map((room) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Room
                        rooms={room}
                        operationHours={props.history.location.state}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </section>
          );
        })}
      </Container>
    </section>
  );
};

export default RoomList;
