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
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sign up!</h2>
        <div>
          <input type="text" onChange={this.handleUsername} /> username
        </div>
        <div>
          <input type="text" onChange={this.handlePassword} /> password

        </div>
        <input type="submit" />
      </form>
    );
  }
}

let Signup = connect()(UnconnectedSignup);
export default Signup;
