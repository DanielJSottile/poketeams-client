import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import SearchBar from './SearchBar-Build';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<SearchBarBuild/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});