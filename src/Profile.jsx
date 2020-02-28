import React, { Component } from "react";
import { Link } from "react-router-dom";
//import NavBar from "./navbar.jsx";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1 className="test">Welcome, {this.props.user}!</h1>
        <div className="push-profile-btns">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn">Following</button>
          <Link to="/upload">
            <button className="profile-btn">Add Picture</button>
          </Link>
        </div>
        <h2 className="descrip2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h2>

        {this.props.posts.map(e => {
          return (
            <div className="picsadded">
              <img height="50%" width="50%" src={e.frontendPath} />
              <div>{e.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Profile;
