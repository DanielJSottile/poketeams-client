import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<LoginForm/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});