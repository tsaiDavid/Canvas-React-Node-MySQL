import * as React from "react";
import HeaderNavigation from "./components/HeaderNavigation";
import { gql, graphql } from "react-apollo";

import "./index.css";

const myQuery = gql`query {
    users {
      first_name
      last_name
    }
  }`;

const MyComponentWithData  = graphql(myQuery)(HeaderNavigation)

export default class App extends React.Component {
  render() {
    return <div className="App">
        <MyComponentWithData />
        <div>{this.props.children}</div>
      </div>;
  }
}
