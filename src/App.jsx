import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined, post: [] };
  }

  setUsername = username => {
    this.setState({ username });
  };
  componentDidMount = async () => {
    let response = await fetch("/find-all");
    let body = await response.text();
    console.log("/find-all response", body);
    body = JSON.parse(body);
    this.setState({ post: body });
  };

  render = () => {
    if (this.props.snup) {
      return <Login setUsername={this.setUsername} />;
    }
    if (this.props.lgin) {
      console.log(this.state.post);
      return (
        <Home
          user={this.state.username}
          post={this.state.post.filter(e => e.username === this.state.username)}
        />
      );
    }
    return <Signup />;
  };
}

let mapStateToProps = state => {
  return { snup: state.signup, lgin: state.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
