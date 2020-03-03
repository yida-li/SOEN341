import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class News extends Component {
  render() {
    return (
      <div className='container'>
        <ul>
          <ol>Private</ol>
          <ol>Personal</ol>
          <ol>Professional</ol>
        </ul>
        <div className='push-upload-btns'>
          <button className='profile-btn'>
            {' '}
            <Link className='nodecor' to='/'>
              Profile
            </Link>
          </button>
          <button className='profile-btn'>
            {' '}
            <Link className='nodecory' to='/upload'>
              Upload
            </Link>
          </button>
          <button className='profile-btn'>
            {' '}
            <Link className='nodecory' to='/followers'>
              Followers
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
export default News;
