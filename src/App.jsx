import React, { Component } from "react"; // default setup
import Signup from "./Signup.jsx"; // ./ means bring the component from the same folder .
import Login from "./Login.jsx";
import { connect } from "react-redux"; // 자식이 부모에게 물려받는데 이부분이 로그아웃부분을할경우 에러가 많이생긴다. 제일좋은방법은 리덕스(중앙처리장치)개념을이용해
//기존의 코드를 지우고 store.js를 통해 리덕스를 사용한다.
import Home from "./Home.jsx";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined };
  }
  setUsername = username => {
    this.setState({ username: username });
  };

  //this.state = { signupSuccess: false };

  // setSignup = signupSuccess => {
  //   this.setState({ signupSuccess });
  // };

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

//이부분은 state의 변화시에만 필요. 로그인을갈지 사인업으갈지<div className=""></div>
let mapStateToProps = state => {
  return { snup: state.signup, login: state.loggedIn };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
//<Signup set={this.setSignup} />;
