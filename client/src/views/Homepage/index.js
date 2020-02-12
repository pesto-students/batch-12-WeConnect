import React, { Component } from "react";

import style from "./Homepage.module.css";

import { Grid, Button, TextField } from "../../components/Generic";
import { getWorkSpaceData } from "../../apis/getWorkSpace";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      searchTerm: ""
    };
  }

  validateSearch = event => {
    let { value } = event.target;
    if (event.target.value.length < 3) {
      this.setState(() => ({
        helperText: "Enter atleast 3 char",
        error: true
      }));
    } else {
      this.setState(() => ({
        helperText: "",
        error: false,
        searchTerm: value
      }));
    }
  };

  getWorkSpace = event => {
    if (this.state.searchTerm.length > 2) {
      event.target.setAttribute("disabled", true);
      getWorkSpaceData().then(data => {
        if (data.status === "success") {
          this.props.history.push({
            pathname: "/workspace",
            state: {
              workspaces: data.workspaces
            }
          });
        }
      });
    }
  };

  render() {
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
              style={{ backgroundColor: "#fff" }}
              error={this.state.error}
              helperText={this.state.helperText}
              placeholder="Enter Your City"
              fullWidth
              variant="outlined"
              type="text"
              autoFocus={true}
              className="input"
              onChange={this.validateSearch}
            />
            <Button
              variant="contained"
              color="primary"
              style={{
                borderRadius: 0,
                position: "absolute",
                right: "-1px",
                padding: "15px 42px"
              }}
              size="large"
              onClick={this.getWorkSpace}
              type="submit"
            >
              Search
            </Button>
          </div>
        </Grid>
      </section>
    );
  }
}

export default Homepage;
