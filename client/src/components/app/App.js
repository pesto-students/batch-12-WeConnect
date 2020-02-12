import React from "react";

import style from "./App.module.css";

import { Grid, Container, Carousel, Button } from "../Generic";
import { WorkSpaceCard, WorkSpaceContent } from "../WorkSpaceCard";
import Amenities from "../Amenities/Amenities";

const App = () => {
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <p color="primary">WeConnect</p>
      </header>
      <main className={style.main}>
        <Container fixed>
          <Grid container>
            <Grid item xs={12} lg={3}>
              <WorkSpaceCard>
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  autoPlay
                  emulateTouch
                >
                  <div>
                    <img
                      src="https://via.placeholder.com/350x150"
                      alt="workspace"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/350x150"
                      alt="workspace"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/350x150"
                      alt="workspace"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/350x150"
                      alt="workspace"
                    />
                  </div>
                </Carousel>
                <WorkSpaceContent
                  name="We-Work"
                  location="Udyog Vihar"
                  maxSeat={20}
                  rooms={10}
                />
                <Amenities>
                  <p>Coffee</p>
                  <p>Chai</p>
                </Amenities>
                <Button color="primary" variant="contained" fullWidth={true}>
                  Explore
                </Button>
              </WorkSpaceCard>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default App;

