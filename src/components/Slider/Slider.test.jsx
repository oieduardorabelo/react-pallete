import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Slider from './Slider';

it('renders correctly', () => {
  const wrapper = shallow(
    <Slider name="test" value={0} onChange={jest.fn()} />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('calls correct onChange spy', () => {
  const spy = jest.fn();
  const wrapper = shallow(
    <Slider name="test" value={0} onChange={spy} />
  );

  wrapper.simulate('change');

  expect(spy).toHaveBeenCalledTimes(1);
});
