import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ShakePanel from './ShakePanel';

it('renders correctly', () => {
  const wrapper = mount(
    <ShakePanel onClickToggleShakePanel={jest.fn()} />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('calls correct onClick spy', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <ShakePanel onClickToggleShakePanel={spy} />
  );

  wrapper.find('button').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});
