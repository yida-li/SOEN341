import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css';
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined, password: undefined };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      alert('success');
      this.props.username(this.state.username);
      this.props.dispatch({ type: 'login-success' });
    } else alert('fail');
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
      <form onSubmit={this.handleSubmit}>
        <h2
          style={{
            backgroundColor: 'palegoldenrod',
            width: '1000px',
            height: '200px'
          }}
        >
          Log in
        </h2>
        <div
          style={{
            backgroundColor: 'palevioletred',
            width: '1000px',
            height: '200px'
          }}
        >
          <input type='text' onChange={this.handleUsername} /> username
        </div>
        <div
          style={{
            backgroundColor: 'paleturquoise',
            width: '1000px',
            height: '200px'
          }}
        >
          <input type='text' onChange={this.handlePassword} /> password
        </div>
        <input className='second' type='submit' />
      </form>
    );
  }
}
let Login = connect()(UnconnectedLogin);

export default Login;
