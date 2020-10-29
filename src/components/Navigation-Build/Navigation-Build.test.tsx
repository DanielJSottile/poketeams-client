import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import NavigationBuild from './Navigation-Build';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<NavigationBuild/>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Suspense fallback={<div>test</div>}>
          <NavigationBuild />
        </Suspense>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const wrapper = shallow(<NavigationBuild />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
