import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  // set username as a globar variable using by constructor.
  // signup is child of app, so if sign up want to get info from father "app" must use props
  // state is defined only one time, if i add more state, connect them to by ,
  constructor(props) {
    super(props);
    this.state = { username: undefined, userpassword: undefined };
  }
  //send the info to the server.
  //각각 핸들유저내임과 핸들패스워드에서 백엔드로 보내면 비효율적, 이걸 서브밑에서 같이 보내고싶다.
  // fetch 를 이용해 싸인업이라는 엔드포인트로 데이터를 전송.
  handleSubmit = async e => {
    e.preventDefault(); // 얘를 안하면 로그인할떄 계속 랜더링한다
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.userpassword);

    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("signup failed");
    } else {
      alert("success!");
      this.props.dispatch({ type: "signup-success" });
    }
  };

  handleUsername = event => {
    let user = event.target.value;
    this.setState({ username: user });

    //console.log(this.state.username);
  };

  handlePassword = event => {
    let pass = event.target.value;
    this.setState({ userpassword: pass });
  };

  // when ever I use jsx into HTML, I have to use {} instead of ()
  // onSubmit=form에있는 내용을 서버로 보내주는역활
  // onChange=해당되는 부분의 내용을 불러오는 역활
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign up!</h1>
        <div>
          <input type="text" onChange={this.handleUsername} /> username{" "}
        </div>
        <div>
          <input type="text" onChange={this.handlePassword} /> password{" "}
        </div>
        <input type="submit" />
      </form>
    );
  }
}

let Signup = connect()(UnconnectedSignup);
export default Signup;
