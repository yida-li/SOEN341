import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css';
class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined, password: undefined };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/signup', {
      method: 'POST',
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert('signup failed');
    } else {
      alert('success');
      this.props.dispatch({ type: 'signup-success' });
    }
    console.log(body);
  };
  handleUsername = event => {
    let user = event.target.value;
    this.setState({ username: user });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  render() {
    return (
      <div
        className='centers'
        style={{
          margin: '200px 400px'
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <h1
            style={{
              backgroundColor: 'palegoldenrod',
              width: '500px',
              height: '50px'
            }}
          >
            <div class='righto'>
              <i class='fas fa-photo-video'></i> VIBE UP!
            </div>
          </h1>

          <div
            style={{
              backgroundColor: 'palevioletred',
              width: '500px',
              height: '100px'
            }}
          >
            <input
              placeholder='Your name..'
              type='text'
              onChange={this.handleUsername}
            />
          </div>

          <div
            style={{
              backgroundColor: 'paleturquoise',
              width: '500px',
              height: '100px'
            }}
          >
            <input
              placeholder='Your password..'
              type='text'
              onChange={this.handlePassword}
            />
          </div>

          <input type='submit' />
          <img src='https://scontent.fyhu1-1.fna.fbcdn.net/v/t1.15752-9/86375660_236192800728348_3658436057352896512_n.png?_nc_cat=105&_nc_ohc=MB01KDDZOsEAX-l3bxH&_nc_ht=scontent.fyhu1-1.fna&oh=b36534c8821a64416f354a2f40b7e34f&oe=5ED37789' />
        </form>
      </div>
    );
  }
}

let Signup = connect()(UnconnectedSignup);
export default Signup;
