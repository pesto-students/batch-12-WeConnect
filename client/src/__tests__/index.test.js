import React from 'react';
import { shallow } from 'enzyme';

import Index from '../views/index';

describe('Check Index View',()=>{
    it('should render the page',()=>{
        const component = shallow(<Index />);
        expect(component.find('h1').text()).toBe('WeConnect');
    })
})
