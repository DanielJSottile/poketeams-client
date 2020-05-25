import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Footer from './Footer';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Footer/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});