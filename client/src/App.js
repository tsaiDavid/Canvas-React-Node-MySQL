import React, { Component } from "react";
import { Jumbotron, Grid, Row } from "react-bootstrap";
import HeaderNavigation from "./components/HeaderNavigation";

import "./index.css";

class App extends Component {
  render() {
    const jumStyle = {
      backgroundColor: "rgb(255,2,17)",
      color: "white"
    };

    return (
      <div className="App">
        <HeaderNavigation />
        <div>
          <Grid>
            <Row>{this.props.children}</Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
