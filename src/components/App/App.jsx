import React from 'react';
import Dragula from 'react-dragula';

import { api } from '../../domain';

import ShakeWindow from '../ShakeWindow/ShakeWindow';
import ColorColumn from '../ColorColumn/ColorColumn';
import FetchPallete from '../FetchPallete/FetchPallete';
import Loader from '../Loader/Loader';
import ShakePanel from '../ShakePanel/ShakePanel';

import styles from './AppStyles';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sequence: [],
      pallete: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const {sequence, pallete} = nextProps;
    this.setState({ sequence, pallete }, api.save({ sequence, pallete }));
  }

  onChangeColorSlider = (colorName, value, colorColumn) => {
    const {sequence, pallete} = this.state;
    pallete[colorColumn][colorName] = value;
    this.setState({ pallete }, api.save({ sequence, pallete }))
  }

  onClickTogglePanel = (colorColumn) => {
    const {sequence, pallete} = this.state;
    pallete[colorColumn].showPanel = !pallete[colorColumn].showPanel;
    this.setState({ pallete }, api.save({ sequence, pallete }));
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
    const {sequence, pallete} = this.state;
    const sequenceCopy = [...sequence];

    const elId = el.getAttribute('data-id');
    const elNewIndex = Array.from(el.parentNode.children).indexOf(el);
    const elOldIndex = sequenceCopy.indexOf(elId);

    sequenceCopy.splice(elOldIndex, 1)
    sequenceCopy.splice(elNewIndex, 0, elId)

    this.setState(
      { sequence: sequenceCopy },
      api.save({ sequence: sequenceCopy, pallete }),
    );
  }

  render() {
    const {isLoading, showShakePanel, onClickToggleShakePanel} = this.props;
    const {pallete, sequence} = this.state;

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
            onClickToggleShakePanel={onClickToggleShakePanel}
          />
        )}
      </div>
    )
  }
}

export default FetchPallete(ShakeWindow(App));
