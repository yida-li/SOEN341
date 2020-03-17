import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Followers extends Component {
  render() {
    return (
      <div className='container'>
        <h2>List of Followers</h2>
        <div className='push-upload-btns'>
          <button className='profile-btn'>
            {' '}
            <Link className='nodecor' to='/'>
              Back to Profile Page hello
            </Link>
          </button>

          <button className='profile-btn'>Remove Followers</button>
        </div>
      </div>
    );
  }
}
export default Followers;
