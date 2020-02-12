import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'palevioletred'
        }}
      >
        <div>
          <h1
            style={{
              backgroundColor: 'paleturquoise',
              width: '1000px',
              height: '50px'
            }}
          >
            <div class='righto'>
              <i class='fas fa-photo-video'></i> Vibe Page
            </div>
          </h1>
        </div>

        <h1>Welcome {this.props.user}</h1>

        <Link to='/upload'>
          <button>Upload Picture</button>
        </Link>
      </div>
    );
    1;
  }
}
export default Profile;
