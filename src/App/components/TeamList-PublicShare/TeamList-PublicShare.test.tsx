import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { render } from '@testing-library/react';
import TeamListPublicShare from './TeamList-PublicShare';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<TeamsListPublic/>', (): void => {
  it('renders without crashing', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const folder = { folder_name: 'folder' };
    ReactDOM.render(
      <BrowserRouter>
        <TeamListPublicShare folder={folder} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('snapshot', (): void => {
    const wrapper = shallow(<TeamListPublicShare />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
