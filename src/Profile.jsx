import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.user}</h1>
        Profile page
        <Link to="/upload">
          <button>+</button>
        </Link>
      </div>
    );
  }
}
export default Profile;
