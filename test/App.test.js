import React from 'react';
import ReactDOM from 'react-dom'
import App from "../src/App"

it("render without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<App/>)
})
