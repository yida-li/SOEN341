import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from signup", responseBody);
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Signup failed");
    }
    this.props.dispatch({ type: "signup-success" });
  };
  handleButton = () => {
    this.props.dispatch({ type: "signup-success" });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Signup</h2>
          Username
          <input type="text" onChange={this.handleUsernameChange} />
          Password
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
        <button onClick={this.handleButton}>already sign up?</button>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
