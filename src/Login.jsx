import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = { usernameInput: "", passwordInput: "" };
  }

  usernameChange = event => {
    this.setState({ usernameInput: event.target.value });
    console.log(this.state.usernameInput);
  };

  passwordChange = event => {
    this.setState({ passwordInput: event.target.value });
    console.log(this.state.passwordInput);
  };

  submitHandler = async evt => {
    evt.preventDefault();
    console.log("username", this.state.usernameInput);
    console.log("password", this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (body.success) {
      alert("Login success");

      this.props.setSignup(false);
    }
  };
  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          Username
          <input
            type="text"
            value={this.state.usernameInput}
            onChange={this.usernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            value={this.state.passwordInput}
            onChange={this.passwordChange}
          />
        </div>
        <div>
          <input type="submit" value="longin" />
        </div>
      </form>
    );
  };
}

export default Signup;
