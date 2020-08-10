import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import App from './App';

describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App/>, div);
    // if something is wrong, itd fail here
    ReactDOM.unmountComponentAtNode(div);
  });
});
