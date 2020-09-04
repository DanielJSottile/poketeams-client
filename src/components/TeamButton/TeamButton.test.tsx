import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import { render } from '@testing-library/react';
import TeamButton from "./TeamButton";
import { shallow, mount, render } from "enzyme";
import toJson from "enzyme-to-json";

describe("<TeamButton/>", (): void => {
  it("renders without crashing", (): void => {
    const div: HTMLDivElement = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <TeamButton />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("snapshot", (): void => {
    const wrapper = shallow(<TeamButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
