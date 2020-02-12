import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import About from './About';
class Profile extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'palevioletred'
        }}
      >
        <Route exact path='/about' Component={About} />
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

          <ul>
            <li>
              <a href='https://www.google.com/'>Home</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
          </ul>
        </div>

        <h1>Welcome {this.props.user}</h1>

        <Link to='/upload'>
          <button>Upload Picture</button>
        </Link>
        <Link to='/upload'>
          <button>Followers</button>
          <Link to='/upload'>
            <button>Followed</button>
          </Link>
          <Link to='/upload'>
            <button>Manage Photo</button>
          </Link>
        </Link>
      </div>
    );
    1;
  }
}
export default Profile;
