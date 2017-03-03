import React from 'react';
import ShakeJS from 'shake.js';

import { api, rgbRandom } from '../../domain';

import ShakePanel from '../ShakePanel/ShakePanel';

function ShakeWindow(Component) {
  return class ShakeWindow extends React.Component {
    static propTypes = {
      pallete: React.PropTypes.shape({}).isRequired,
      sequence: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    }

    constructor(props) {
      super(props);

      this.shakeInstance = new ShakeJS({
        threshold: 15,
        timeout: 1500,
      })

      this.state = {
        pallete: {...this.props.pallete},
        sequence: [...this.props.sequence],
        showShakePanel: false,
      };
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
      const {showShakePanel, pallete, sequence} = this.state;

      return (
        <div>
          <Component
            pallete={pallete}
            sequence={sequence}
          />
          {showShakePanel && (
            <ShakePanel
              onClickToggleShakePanel={this.onClickToggleShakePanel}
            />
          )}
        </div>
      )
    }
  }
}

export default ShakeWindow;
