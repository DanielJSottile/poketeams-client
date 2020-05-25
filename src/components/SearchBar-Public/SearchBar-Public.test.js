import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import SearchBar from './SearchBar-Public';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<SearchBarPublic/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});