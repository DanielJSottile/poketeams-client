import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Folder from './Folder';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Folder/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Folder />)
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});