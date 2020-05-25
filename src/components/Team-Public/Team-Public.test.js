import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Team from './Team-Public';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamPublic/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Team />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});