import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined, password: undefined };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("signup failed");
    } else {
      alert("success");
      this.props.dispatch({ type: "signup-success" });
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

  handleClick = () => {
    this.props.dispatch({ type: "signup-success" });
  };
  render() {
    return (
      <div className="signup-form">
        <form class="" onSubmit={this.handleSubmit}>
          <h1></h1>
          <h1>Vibez</h1>
          <div>
            <input
              type="text"
              placeholder="Full Name"
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
            <input
              type="submit"
              value="Create Account"
              className="signup-btn"
            />
          </div>
          <button className="vibe-btn" onClick={this.handleClick}>
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

let Signup = connect()(UnconnectedSignup);
export default Signup;
