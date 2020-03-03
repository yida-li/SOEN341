import React, { Component } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { connect } from "react-redux";
import Home from "./Home.jsx";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-users");
    let body = await response.text();
    console.log("/all-users response", body);
    body = JSON.parse(body);
    this.setState({ user: body });
    this.props.dispatch({ type: "SET_USER", users: body });
  };

  setUsername = username => {
    this.setState({ username: username });
  };
  render() {
    if (this.props.snup) {
      return <Login username={this.setUsername} />;
    }
    if (this.props.login) {
      return <Home username={this.state.username} />;
    }
    return <Signup />;
  }
}
let mapStateToProps = state => {
  return { snup: state.signup, login: state.loggedIn };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
