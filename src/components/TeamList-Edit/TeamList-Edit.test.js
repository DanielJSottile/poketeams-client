import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import TeamList from './TeamList-Edit';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamListEdit/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TeamList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});