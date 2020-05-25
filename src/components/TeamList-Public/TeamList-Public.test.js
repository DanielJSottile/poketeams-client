import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import TeamList from './TeamList-Public';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamListPublic/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TeamList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});