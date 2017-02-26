import React from 'react';
import ShakeJS from 'shake.js';

import { api, rgbRandom } from '../../domain';


function ShakeWindow(Component) {
  return class ShakeWindow extends React.Component {
    constructor(props) {
      super(props);

      this.shakeInstance = new ShakeJS({
        threshold: 15,
        timeout: 1500,
      })

      this.state = {
        showShakePanel: false,
        sequence: [],
        pallete: [],
      };
    }

    componentWillReceiveProps(nextProps) {
      const {sequence, pallete} = nextProps;
      this.setState({ sequence, pallete }, api.save({ sequence, pallete }));
    }

    componentDidMount() {
      this.shakeInstance.start();
      window.addEventListener('shake', this.onShakeWindow, false);
    }

    componentWillUnmount() {
      this.shakeInstance.stop();
      window.removeEventListener('shake', this.onShakeWindow, false);
    }

    onShakeWindow = (event) => {
      const {sequence, pallete, showShakePanel} = this.state;

      Object.keys(pallete).forEach(colorColumn => {
        pallete[colorColumn].r = rgbRandom();
        pallete[colorColumn].g = rgbRandom();
        pallete[colorColumn].b = rgbRandom();
      })

      this.setState({
        pallete,
        sequence,
        showShakePanel: !showShakePanel,
      }, api.save({ sequence, pallete }));
    }

    onClickToggleShakePanel = () => {
      this.setState(state => ({
        showShakePanel: !state.showShakePanel
      }));
    }

    render() {
      return (
        <Component
          isLoading={this.props.isLoading}
          pallete={this.state.pallete}
          sequence={this.state.sequence}
          showShakePanel={this.state.showShakePanel}
          onClickToggleShakePanel={this.onClickToggleShakePanel}
        />
      )
    }
  }
}

export default ShakeWindow;
