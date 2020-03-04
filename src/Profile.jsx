
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }
  handleSearch = event => {
    const query = event.target.value;
    const results = this.props.user.filter(item => {
      return item.username.includes(query);
    });
    console.log(results);
    this.setState({ results: results });
  };
  render() {
    const profileUser = this.props.user.find(
      e => e.username === this.props.mainUser
    );

    return (
      <div>

        <div className="search_box">
          <input
            type="text"
            placeholder="Search Users"
            onChange={this.handleSearch}
          />
          {/*<i className="fas fa-search"></i>*/}
        </div>

        <div>
          {this.state.results.map(e => {
            return <div>{e.username}</div>;
          })}
        </div>
        <h1 className="test">
          Welc
          <img
            className="profile-pic-upload"
            height="100px"
            src={profileUser.frontendPath}
          />
          me, {this.props.mainUser}!
        </h1>
        {/* <img height="100px" src={profileUser.frontendPath} /> */}
        <div className="push-profile-btns">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn">Following</button>
          <Link to="/upload">
            <button className="profile-btn">Add Picture</button>

          </Link>
          <Link to='/followers'>
            <button className='profile-btn'>My Followers</button>
          </Link>
          <Link to='/news'>
            <button className='profile-btn'>NewsFeed</button>
          </Link>
          <div class='dropdown'>
            <button className='profile-btn'>Settings</button>
            <div className='dropdown-content'>
              <a href='#'>I am still thinking</a>
              <a href='#'>I am still studying</a>
              <a href='#'>I am still learning</a>
            </div>
          </div>
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

        {this.props.post
          .filter(e => e.username === this.props.mainUser)
          .map(e => {
            return (
              <div className="description-box-container">
                <img
                  className="profile-pic-upload-2"
                  height="50%"
                  width="50%"
                  src={e.frontendPath}
                />
                <div className="descrip2">
                  <div>{e.description}</div>
                </div>
              </div>
            );
          })}

      </div>
    );
  }
}
let mapStateToProps = state => {
  return { post: state.posts, user: state.users };
};
let Profile = connect(mapStateToProps)(UnconnectedProfile);
export default Profile;
