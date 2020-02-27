import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined, password: undefined };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      alert("success");
      this.props.username(this.state.username);
      this.props.dispatch({ type: "login-success" });
    } else alert("fail");
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
      <div className="signup-form">
        <form class="" onSubmit={this.handleSubmit}>
          <h1>Vibez</h1>
          <div>
            <input
              type="text"
              placeholder="User Name"
              className="txtb"
              onChange={this.handleUsername}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="txtb"
              onChange={this.handlePassword}
            />
          </div>
          <div>
            <input type="submit" value="Login" className="signup-btn" />
          </div>
        </form>
      </div>
    );
  }
}
let Login = connect()(UnconnectedLogin);
export default Login;
