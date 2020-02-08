import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";

class UnconnectedApp extends Component {
  render = () => {
    if (this.props.snup) {
      return <Login />;
    }
    if (this.props.lgin) {
      return <Home />;
    }
    return <Signup />;
  };
}

let mapStateToProps = state => {
  return { snup: state.signup, lgin: state.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
