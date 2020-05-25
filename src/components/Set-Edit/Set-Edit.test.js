import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Set from './Set-Edit';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<SetEdit/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Set />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});