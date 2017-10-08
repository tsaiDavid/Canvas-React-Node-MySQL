import * as React from "react";
import HeaderNavigation from "./components/HeaderNavigation";

import "./index.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeaderNavigation />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
