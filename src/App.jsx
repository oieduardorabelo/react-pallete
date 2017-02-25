import React from 'react';

import { store } from './domain';

import ColorColumn from './ColorColumn';

import styles from './AppStyles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, store);
  }

  onChangeColorSlider = (colorName, value, colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn][colorName] = value;
    this.setState(pallete);
  }

  onClickTogglePanel = (colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn].showPanel = !pallete[colorColumn].showPanel;
    this.setState(pallete);
  }

  render() {
    const {pallete} = this.state;
    const colorPallete = Object.keys(pallete)
      .map(key =>
        <ColorColumn
          data={pallete[key]}
          key={key}
          name={key}
          onChangeColorSlider={this.onChangeColorSlider}
          onClickTogglePanel={this.onClickTogglePanel}
        />
      )

    return (
      <div style={styles.container}>
        {colorPallete}
      </div>
    )
  }
}

export default App;
