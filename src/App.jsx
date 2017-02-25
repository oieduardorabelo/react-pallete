import React from 'react';

import { api, store } from './domain';

import Loader from './Loader';
import ColorColumn from './ColorColumn';

import styles from './AppStyles';

const LOADING_TIME = 2000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pallete: {},
    };
  }

  componentDidMount() {
    const loadData = api.getAll();
    let pallete = {};

    if (loadData) {
      pallete = Object.assign({}, loadData)
    } else {
      pallete = Object.assign({}, store)
      api.save(pallete);
    }

    setTimeout(() => {
      this.setState({ isLoading: false, pallete });
    }, LOADING_TIME);
  }

  saveData = (pallete) => {
    api.save(pallete);
    this.setState(pallete);
  }

  onChangeColorSlider = (colorName, value, colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn][colorName] = value;
    this.saveData(pallete);
  }

  onClickTogglePanel = (colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn].showPanel = !pallete[colorColumn].showPanel;
    this.saveData(pallete);
  }

  render() {
    const {isLoading, pallete} = this.state;
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

    if (isLoading) {
      return <Loader />
    }

    return (
      <div style={styles.container}>
        {colorPallete}
      </div>
    )
  }
}

export default App;
