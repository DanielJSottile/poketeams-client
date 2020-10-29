import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import TeamPublicShare from './Team-Public-Share';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamPublicShare>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const team = { team_name: 'test' };
    const folder = { folder_name: 'folder' };
    ReactDOM.render(
      <BrowserRouter>
        <Suspense fallback={<div>test</div>}>
          <TeamPublicShare team={team} folder={folder} />
        </Suspense>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const team = { team_name: 'test' };
    const folder = { folder_name: 'folder' };
    const wrapper = shallow(<TeamPublicShare team={team} folder={folder} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
