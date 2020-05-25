import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import TeamButton from './TeamButton';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamButton/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TeamButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});