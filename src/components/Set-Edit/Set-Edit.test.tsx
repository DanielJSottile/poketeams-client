import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import { render } from '@testing-library/react';
import SetEdit from "./Set-Edit";
import { shallow, mount, render } from "enzyme";
import toJson from "enzyme-to-json";

describe("<SetEdit/>", (): void => {
  it("renders without crashing", (): void => {
    const div: HTMLDivElement = document.createElement("div");
    const set = { nickname: "test", species: "Pikachu" };
    ReactDOM.render(
      <BrowserRouter>
        <SetEdit set={set} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("snapshot", (): void => {
    const set = { nickname: "test", species: "Pikachu" };
    const wrapper = shallow(<SetEdit set={set} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
