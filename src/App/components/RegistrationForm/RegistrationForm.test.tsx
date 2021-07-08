import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<RegistrationForm/>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const wrapper = shallow(<RegistrationForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
