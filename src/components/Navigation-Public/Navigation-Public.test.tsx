import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import { render } from '@testing-library/react';
import NavigationPublic from "./Navigation-Public";
import { shallow, mount, render } from "enzyme";
import toJson from "enzyme-to-json";

describe("<NavigationPublic/>", (): void => {
  it("renders without crashing", (): void => {
    const div: HTMLDivElement = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <NavigationPublic />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("snapshot", (): void => {
    const wrapper = shallow(<NavigationPublic />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
