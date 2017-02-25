import React from 'react';
import ShakeJS from 'shake.js';
import Dragula from 'react-dragula';

import { api, store, rgbRandom } from '../../domain';

import Loader from '../Loader/Loader';
import ColorColumn from '../ColorColumn/ColorColumn';
import ShakePanel from '../ShakePanel/ShakePanel';

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
      sequence: [],
      pallete: {},
    };
  }

  componentDidMount() {
    const loadData = api.getAll();
    let pallete = {};
    let sequence = {};

    if (loadData) {
      pallete = Object.assign({}, loadData.pallete);
      sequence = [...loadData.sequence];
    } else {
      pallete = Object.assign({}, store);
      sequence = Object.keys(pallete);
      api.save({ sequence, pallete });
    }

    this.shakeInstance.start();
    window.addEventListener('shake', this.onShakeWindow, false)

    setTimeout(() => {
      this.setState({
        isLoading: false,
        sequence,
        pallete,
      });
    }, LOADING_TIME);
  }

  componentWillUnmount() {
    this.shakeInstance.stop();
    window.removeEventListener('shake', this.onShakeWindow, false);
  }

  onShakeWindow = (event) => {
    const { pallete } = this.state;

    Object.keys(pallete).forEach(colorColumn => {
      pallete[colorColumn].r = rgbRandom();
      pallete[colorColumn].g = rgbRandom();
      pallete[colorColumn].b = rgbRandom();
    })

    this.setState({
      showShakePanel: !this.state.showShakePanel,
    }, () => {
      this.persistStorage();
    });
  }

  onChangeColorSlider = (colorName, value, colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn][colorName] = value;
    this.setState({ pallete }, () => {
      this.persistStorage();
    })
  }

  onClickTogglePanel = (colorColumn) => {
    const {pallete} = this.state;
    pallete[colorColumn].showPanel = !pallete[colorColumn].showPanel;
    this.setState({ pallete }, () => {
      this.persistStorage();
    })
  }

  onClickToggleShakePanel = () => {
    this.setState({
      showShakePanel: !this.state.showShakePanel,
    });
  }

  dragulaDecorator = (refInstance) => {
    if (refInstance) {
      const options = {
        moves(el, containerMove, handle) {
          const handleId = handle.getAttribute('data-id');
          if (handleId === 'drag-me') { return true }
          return false;
        }
      };
      const drag = Dragula([refInstance], options);
      drag.on('drop', this.rearrangeItems);
    }
  }

  rearrangeItems = (el, target, source, sibling) => {
    const elId = el.getAttribute('data-id');
    const elNewIndex = Array.from(el.parentNode.children).indexOf(el);
    const sequenceCopy = this.state.sequence.slice();
    const fromIndex = sequenceCopy.indexOf(elId);

    sequenceCopy.splice(fromIndex, 1)
    sequenceCopy.splice(elNewIndex, 0, elId)

    this.setState({ sequence: sequenceCopy }, () => {
      this.persistStorage();
    });
  }

  persistStorage = () => {
    const { pallete, sequence } = this.state;
    api.save({ sequence, pallete });
  }

  render() {
    const {isLoading, pallete, sequence, showShakePanel} = this.state;

    const colorPallete = sequence
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
      <div>
        <div
          ref={this.dragulaDecorator}
          style={styles.containerPallete}
        >
          {colorPallete}
        </div>
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
