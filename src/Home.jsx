import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";

class Home extends Component {
  renderUpload = () => {
    return <Upload user={this.props.username} />;
  };
  renderProfile = () => {
    return <Profile user={this.props.username} />;
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
export default Home;
