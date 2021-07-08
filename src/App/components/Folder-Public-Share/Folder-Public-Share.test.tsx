import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import FolderPublicShare from './Folder-Public-Share';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamPublicShare>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const team = { team_name: 'test' };
    ReactDOM.render(
      <BrowserRouter>
        <Suspense fallback={<div>test</div>}>
          <FolderPublicShare />
        </Suspense>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const team = { team_name: 'test' };
    const wrapper = shallow(<FolderPublicShare />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
