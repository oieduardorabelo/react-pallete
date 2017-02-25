import React from 'react';
import ShakeJS from 'shake.js';

import { api, store, rgbRandom } from './domain';

import Loader from './Loader';
import ColorColumn from './ColorColumn';
import ShakePanel from './ShakePanel';

import styles from './AppStyles';

const LOADING_TIME = 2000;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.shakeInstance = new ShakeJS({
      threshold: 15,
      timeout: 1500,
    })

    this.state = {
      isLoading: true,
      showShakePanel: false,
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

    this.shakeInstance.start();
    window.addEventListener('shake', this.onShakeWindow, false)

    setTimeout(() => {
      this.setState({ isLoading: false, pallete });
    }, LOADING_TIME);
  }

  componentWillUnmount() {
    this.shakeInstance.stop();
    window.removeEventListener('shake', this.onShakeWindow, false);
  }

  onShakeWindow = (event) => {
    const {pallete} = this.state;
    Object.keys(pallete).forEach(colorColumn => {
      pallete[colorColumn].r = rgbRandom();
      pallete[colorColumn].g = rgbRandom();
      pallete[colorColumn].b = rgbRandom();
    })

    this.savePallete(pallete);
    this.setState({
      showShakePanel: !this.state.showShakePanel,
    })
  }

  savePallete = (pallete) => {
    api.save(pallete);
    this.setState(pallete);
  }

  onChangeColorSlider = (colorName, value, colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn][colorName] = value;
    this.savePallete(pallete);
  }

  onClickTogglePanel = (colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn].showPanel = !pallete[colorColumn].showPanel;
    this.savePallete(pallete);
  }

  onClickToggleShakePanel = () => {
    this.setState({
      showShakePanel: !this.state.showShakePanel,
    });
  }

  render() {
    const {isLoading, pallete, showShakePanel} = this.state;

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
        {showShakePanel && (
          <ShakePanel
            onClickToggleShakePanel={this.onClickToggleShakePanel}
          />
        )}
      </div>
    )
  }
}

export default App;
