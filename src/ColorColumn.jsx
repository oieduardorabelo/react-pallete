import React from 'react';

const rgbRandom = () => Math.floor(Math.random() * 255);
const stopPropagation = event => {
  event.preventDefault();
  event.stopPropagation();
}

const styles = {
  row() {
    return {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      justifyContent: 'center',
    }
  },
  label() {
    return {
      backgroundColor: 'transparent',
      border: 0,
      color: '#FFFFFF',
      opacity: 0.75,
      textAlign: 'center',
      textTransform: 'uppercase',
    }
  },
  panel() {
    return {
      animation: 'slideIn 100ms linear',
      backgroundColor: '#FFFFFF',
      bottom: 0,
      display: 'none',
      flexDirection: 'column',
      left: 0,
      padding: 20,
      position: 'fixed',
      right: 0,
      zIndex: 2,
    }
  },
  panelOverlay() {
    return {
      animation: 'fadeIn 160ms linear',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      display: 'none',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1,
    }
  },
  inputSliders() {
    return {
      marginBottom: 5,
      marginTop: 5,
      maxWidth: '100%',
    }
  },
  panelDisplay() {
    return {
      height: 20,
      marginBottom: 20,
      marginTop: 10,
    }
  },
  panelClose() {
    return {
      alignSelf: 'flex-end'
    }
  }
}

class ColorColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: rgbRandom(),
      g: rgbRandom(),
      b: rgbRandom(),
      showPanel: false,
    }
  }

  onClickTogglePanel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showPanel: !this.state.showPanel })
  }

  onChangeColorSlider = (event) => {
    const target = event.target;
    const {name, value} = target;
    this.setState({ [name]: value });
  }

  render() {
    const { r, g, b, showPanel } = this.state;
    const columnStyles = styles.row();
    const panelStyles = styles.panel();
    const panelDisplay = styles.panelDisplay();
    const panelOverlayStyles = styles.panelOverlay();

    columnStyles.backgroundColor = `rgb(${r},${g},${b})`;
    panelDisplay.backgroundColor = `rgb(${r},${g},${b})`;

    if (showPanel) {
      panelStyles.display = 'flex';
      panelOverlayStyles.display = 'flex';
    }

    return (
      <div style={columnStyles} onClick={this.onClickTogglePanel}>
        <span style={styles.label()}>{columnStyles.backgroundColor}</span>
        <div style={panelOverlayStyles} onClick={this.onClickTogglePanel} />
        <div style={panelStyles} onClick={stopPropagation}>
          <button style={styles.panelClose()} type="button" onClick={this.onClickTogglePanel}>Close</button>
          <span>Current color:</span>
          <div style={panelDisplay} />
          <input
            style={styles.inputSliders()}
            name="r" type="range"
            min="0" max="255" step="1"
            value={this.state.r}
            onChange={this.onChangeColorSlider}
          />
          <input
            style={styles.inputSliders()}
            name="g" type="range"
            min="0" max="255" step="1"
            value={this.state.g}
            onChange={this.onChangeColorSlider}
          />
          <input
            style={styles.inputSliders()}
            name="b" type="range"
            min="0" max="255" step="1"
            value={this.state.b}
            onChange={this.onChangeColorSlider}
          />
        </div>
      </div>
    )
  }
};

export default ColorColumn;
