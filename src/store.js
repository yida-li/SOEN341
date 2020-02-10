import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signup: true };
  }
  if (action.type == "login-success") {
    return { ...state, signup: false, loggedIn: true };
  }
  return state;
};

const store = createStore(reducer, { signup: false, loggedIn: false });

export default store;
