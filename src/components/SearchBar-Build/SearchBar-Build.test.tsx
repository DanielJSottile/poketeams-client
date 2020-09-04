import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import { render } from '@testing-library/react';
import SearchBarBuild from "./SearchBar-Build";
import { shallow, mount, render } from "enzyme";
import toJson from "enzyme-to-json";

describe("<SearchBarBuild/>", (): void => {
  it("renders without crashing", (): void => {
    const div: HTMLDivElement = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <SearchBarBuild />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("snapshot", (): void => {
    const wrapper = shallow(<SearchBarBuild />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
