import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ShakeWindow from './ShakeWindow';
import ShakePanel from '../ShakePanel/ShakePanel';

const WrappedComponent = () => <div></div>

it('renders correctly', () => {
  const wrapper = mount(
    React.createElement(
      ShakeWindow(WrappedComponent),
      { pallete: {}, sequence: [] },
    )
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('updates pallete/sequence state correctly', () => {
  const wrapper = mount(
    React.createElement(
      ShakeWindow(WrappedComponent),
      { pallete: {}, sequence: [] },
    )
  );

  wrapper.setState({
    pallete: { color1: {} },
    sequence: ['color1']
  })

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('ShakePanel displays when showShakePanel state updates correctly', () => {
  const wrapper = mount(
    React.createElement(
      ShakeWindow(WrappedComponent),
      { pallete: {}, sequence: [] },
    )
  );

  wrapper.setState({
    showShakePanel: true
  })

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('ShakePanel hides when click on close button correctly', () => {
  const wrapper = mount(
    React.createElement(
      ShakeWindow(WrappedComponent),
      { pallete: {}, sequence: [] },
    )
  );

  wrapper.setState({
    showShakePanel: true
  })

  expect(toJson(wrapper)).toMatchSnapshot();

  wrapper.find(ShakePanel).find('button').simulate('click')

  expect(toJson(wrapper)).toMatchSnapshot();
});
