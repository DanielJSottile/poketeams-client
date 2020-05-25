import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import TeamsButtonList from './TeamsButtonList-Edit';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamsButtonListEdit/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TeamsButtonList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});