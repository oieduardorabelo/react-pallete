import React from 'react';

const Slider = (props) => (
  <input
    style={props.styles}
    name={props.name} type="range"
    min="0" max="255" step="1"
    value={props.value}
    onChange={props.onChange}
  />
)

export default Slider
