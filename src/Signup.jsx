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

  submitHandler = async event => {
    event.preventDefault(); // without this comment, programe render continously.
    let data = new FormData(); // with multer
    data.append("username", this.state.usernameInput);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (body.success) {
      alert("Signup success");
      this.props.setSignup(true);
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
          <input type="submit" />
        </div>
      </form>
    );
  };
}

export default Signup;
