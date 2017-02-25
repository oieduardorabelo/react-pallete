import React from 'react';

import { stopPropagation } from './domain';

import Slider from './Slider'
import styles from './ColorColumnStyles'

class ColorColumn extends React.Component {
  onClickTogglePanel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClickTogglePanel(this.props.name);
  }

  onChangeColorSlider = (event) => {
    const target = event.target;
    const {name, value} = target;
    this.props.onChangeColorSlider(name, value, this.props.name)
  }

  render() {
    const { showPanel, r, g, b } = this.props.data;

    const columnStyles = styles.row();
    const panelStyles = styles.panel();
    const panelDisplayStyles = styles.panelDisplay();
    const panelOverlayStyles = styles.panelOverlay();

    const bgColor = `rgb(${r},${g},${b})`;
    columnStyles.backgroundColor = bgColor;
    panelDisplayStyles.backgroundColor = bgColor;

    if (showPanel) {
      const displayFlex = 'flex';
      panelStyles.display = displayFlex;
      panelOverlayStyles.display = displayFlex;
    }

    return (
      <div style={columnStyles} onClick={this.onClickTogglePanel}>

        <span style={styles.label()}>{columnStyles.backgroundColor}</span>

        <div style={panelOverlayStyles} onClick={this.onClickTogglePanel} />

        <div style={panelStyles} onClick={stopPropagation}>
          <button
            onClick={this.onClickTogglePanel}
            style={styles.panelClose()}
            type="button"
          >
            Close
          </button>

          <span>Current color:</span>
          <div style={panelDisplayStyles} />

          <Slider
            name="r"
            onChange={this.onChangeColorSlider}
            style={styles.inputSliders()}
            value={r}
          />
          <Slider
            name="g"
            onChange={this.onChangeColorSlider}
            style={styles.inputSliders()}
            value={g}
          />
          <Slider
            name="b"
            onChange={this.onChangeColorSlider}
            style={styles.inputSliders()}
            value={b}
          />
        </div>
      </div>
    )
  }
};

export default ColorColumn;
