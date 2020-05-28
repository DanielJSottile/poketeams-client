import React from 'react';
//import { render } from '@testing-library/react';
import Navigation from './Navigation-Public';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<NavigationPublic/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Navigation />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});