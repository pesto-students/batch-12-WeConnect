import React from 'react';
import { shallow } from 'enzyme';

import WorkspaceList from '../../views/WorkSpaceList';
import { sampleLocation } from '../../apis/getWorkSpace';

import { WorkSpaceCard } from '../../components/WorkSpaceCard';

describe('Testing the workspace Listing', () => {
  const location = {
    pathname: '/workspace',
    search: '?q=Delhi',
    hash: '',
    key: 'allc40',
    state: { workspaces: sampleLocation },
  };
  const wrapper = shallow(<WorkspaceList location={location} />);

  it('Filter Element is there in the view', () => {
    const filterEle = wrapper.find('Filter').length;
    expect(filterEle).toBe(1);
  });

  it('Its should have a workspace View container', () => {
    const workspaces = wrapper.find('#workspaces-view').length;
    expect(workspaces).toBe(1);
  });

  it('Its should have a workspace View Rendering Children', () => {
    const workspaces = wrapper.find('#workspaces-view');
    const workspaceViewRenderer = workspaces.children.length;
    expect(workspaceViewRenderer).toBe(1);
  });
});
