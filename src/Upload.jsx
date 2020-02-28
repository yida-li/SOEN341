import React, { Component } from "react";
import { Link } from "react-router-dom";

class Upload extends Component {
  constructor() {
    super();
    this.state = { file: "", previewImg: "", description: "" };
  }

  handleImage = event => {
    const image = event.target.files[0];
    this.setState({ file: image, previewImg: URL.createObjectURL(image) });
    this.setState({});
  };
  submitHandler = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("img", this.state.file);
    data.append("description", this.state.description);
    data.append("username", this.props.user);
    fetch("/new-post", { method: "POST", body: data });
    alert("upload success");
  };
  descriptionHandler = event => {
    this.setState({ description: event.target.value });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>UPLOAD</h1>
        <input
          className="custom-file-input"
          type="file"
          onChange={this.handleImage}
        />
        <div>
          <img height="150px" src={this.state.previewImg} />
        </div>
        <div>
          <textarea
            className="tb5"
            placeholder="Picture description"
            onChange={this.descriptionHandler}
          />
        </div>
        <div className="push-upload-btns">
          <input className="profile-btn" type="submit" />
          <button className="profile-btn">
            {" "}
            <Link className="nodecor" to="/">
              Profile
            </Link>
          </button>
        </div>
      </form>
    );
  }
}
export default Upload;
