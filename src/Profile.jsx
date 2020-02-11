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
        {this.props.posts.map(e => {
          return (
            <div>
              <img height="150px" width="200px" src={e.frontendPath} />
              <div>{e.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Profile;
