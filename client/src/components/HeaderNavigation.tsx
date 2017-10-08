import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

export default class HeaderNavigation extends React.Component {
  render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Demo App</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <LinkContainer to="/">
            <button className="pt-button pt-minimal pt-icon-home">Home</button>
          </LinkContainer>
          <LinkContainer to="/search">
            <button className="pt-button pt-minimal pt-icon-user">Users</button>
          </LinkContainer>
          <span className="pt-navbar-divider" />
          <button className="pt-button pt-minimal pt-icon-user" />
          <button className="pt-button pt-minimal pt-icon-notifications" />
          <button className="pt-button pt-minimal pt-icon-cog" />
        </div>
      </nav>
    );
  }
}
