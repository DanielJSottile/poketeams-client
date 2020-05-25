import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import FoldersList from './FoldersList';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<FolderList/>', () => {
  
  it('renders without crashing', () => {
    const wrapper = shallow(<FoldersList/>)
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});