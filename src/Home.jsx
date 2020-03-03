import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";

class UnconnectedHome extends Component {
  componentDidMount = async () => {
    let response = await fetch("/find-all");
    let body = await response.text();
    console.log("/find-all response", body);
    body = JSON.parse(body);
    this.props.dispatch({ type: "SET_POST", posts: body });
  };

  renderUpload = () => {
    // adding new stuff
    return <Upload user={this.props.username} />;
  };
  renderProfile = () => {
    return (
      <Profile
        mainUser={this.props.username}
        // posts={this.state.posts.filter(e => e.username === this.props.username)}
      />
    );
  };
  render() {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={this.renderProfile} />
        <Route exact={true} path="/upload" render={this.renderUpload} />
      </BrowserRouter>
    );
  }
}

let Home = connect()(UnconnectedHome);

export default Home;
