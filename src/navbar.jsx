import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <h1>Welcome, {this.props.user}!</h1>
        </a>
      </nav>
    );
  }
}

export default NavBar;
