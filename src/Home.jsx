import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", previewImg: "", description: "" };
  }

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };
  fileChangeHandler = event => {
    this.setState({
      file: event.target.files[0],
      previewImg: URL.createObjectURL(event.target.files[0])
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("user", this.props.user);
    data.append("img", this.state.file);
    data.append("description", this.state.description);

    fetch("/new-post", { method: "POST", body: data });
    alert("upload success");
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Main Page</h1>
          <div>{this.props.user}</div>
          {this.props.post.map(e => {
            return (
              <div>
                <img height="150px" width="200px" src={e.frontendPath} />
                <div>{e.description}</div>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.fileChangeHandler} />
          <div>
            <img height="200px" src={this.state.previewImg} />
          </div>
          <div>
            <input type="text" onChange={this.handleDescription} />
          </div>
          <input type="submit" />
        </form>
      </BrowserRouter>
    );
  }
}

export default Home;
