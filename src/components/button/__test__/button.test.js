import React from "react";
import ReactDOM from "react-dom";
import Button from "./ ../button";
import { isTSAnyKeyword } from "@babel/types";

import { render } from "@testing-library/react";
import "jest-dom/extend-expect";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="click me"></Button>);
  expect(getByTestId("button")).toHaveTextContent("click me please");
});
