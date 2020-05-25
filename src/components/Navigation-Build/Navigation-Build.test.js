import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Navigation from './Navigation-Build';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<NavigationBuild/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Navigation />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});