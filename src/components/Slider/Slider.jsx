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

Slider.propTypes = {
  styles: React.PropTypes.shape({}),
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

export default Slider
