import React from 'react';
import { shallow } from 'enzyme';
import Homepage from '../../views/Homepage';

describe('Test Homepage Component', () => {
  it('should have search field', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#searchInput').length).toBe(1);
  });

  it('should have button of submit type', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#homeButton').length).toBe(1);
  });
});
