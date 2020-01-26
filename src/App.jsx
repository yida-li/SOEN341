import React, { Component } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { signup: false };
  }
  setSignup = signup => {
    this.setState({ signup });
  };
  render = () => {
    if (this.state.signup) {
      return (
        <div>
          <Login />
        </div>
      );
    }
    return (
      <div>
        <Signup setSignup={this.setSignup} />
        {/* <Login /> */}
      </div>
    );
  };
}

export default App;
