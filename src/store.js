import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signup: true };
  }
  if (action.type === "login-success") {
    return { ...state, signup: false, loggedIn: true };
  }
  if (action.type === "SET_POST") {
    return { ...state, posts: action.posts };
  }
  if (action.type === "SET_USER") {
    return { ...state, users: action.users };
  }
  return state;
};

const store = createStore(reducer, {
  signup: false,
  loggedIn: false,
  users: [],
  posts: []
});

export default store;
