import React from 'react';
import { shallow } from 'enzyme';
import DirectLinks from './DirectLinks';

it('Renders without crashing', () => {
  shallow(<DirectLinks />);
});
