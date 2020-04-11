import React from 'react';
import ReactDOM from 'react-dom'
import NavBar from "../src/components/layout/Navbar"

it("render without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<NavBar/>)
})
