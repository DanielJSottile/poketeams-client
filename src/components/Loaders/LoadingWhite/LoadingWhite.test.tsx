import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import LoadingWhite from './LoadingWhite';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<LoginForm/>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <LoadingWhite />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const wrapper = shallow(<LoadingWhite />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
