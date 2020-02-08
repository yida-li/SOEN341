import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  return state;
};

const store = createStore(reducer, { loggedIn: false });

export default store;
