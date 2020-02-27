import React, { useState, useEffect } from 'react';
import LinearProgress from '../../components/Generic/ProgressBar/LinearProgress';
import getRoomData from '../../apis/getRooms';
import { Container, Grid, TextField } from '../../components/Generic';
import Room from '../../containers/room';
import moment from 'moment';

import style from './RoomList.module.css';

const RoomList = (props) => {
  const [floors, setFloors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new moment().format('YYYY-MM-DD'));

  useEffect(() => {
    getRoomData(props.location.pathname).then((floorsData) => {
      console.log(floorsData);
      setIsLoading(false);
      setFloors(floorsData);
    });
  }, [props.location.pathname]);

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <section>
      {isLoading ? <LinearProgress /> : ''}
      <Container fixed>
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue={date}
          onChange={updateDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {floors.map((eachFloor) => {
          if (eachFloor.rooms.length < 1) {
            return null;
          }
          return (
            <section
              className={style.floorSection}
              key={eachFloor._id}
              id={eachFloor._id}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <p className={style.floorName}>{eachFloor.name}</p>
                </Grid>
                {eachFloor.rooms.map((room) => {
                  return (
                    <Grid item xs={12} md={4}>
                      <Room
                        rooms={room}
                        day={moment(date).day()}
                        operationHours={
                          props.history.location.state.operationHours
                        }
                        floorId={eachFloor._id}
                        floorName={eachFloor.name}
                        //                 ownerId: workspace.owner,
                        // locationName: workspace.locationName,
                        // locationId:workspace.locationId,
                        // workspaceName: workspace.name,
                        // workspaceId: workspace._id
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
