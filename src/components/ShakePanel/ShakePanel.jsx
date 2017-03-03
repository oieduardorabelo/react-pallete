import React from 'react';

import { stopPropagation } from '../../domain';

import styles from '../ColorColumn/ColorColumnStyles'

const panelStyles = styles.panel();
const panelOverlayStyles = styles.panelOverlay();

const displayFlex = 'flex';
panelStyles.display = displayFlex;
panelOverlayStyles.display = displayFlex;

const ShakePanel = (props) => (
  <div>
    <div style={panelOverlayStyles} onClick={props.onClickToggleShakePanel} />

    <div style={panelStyles} onClick={stopPropagation}>
      <button
        onClick={props.onClickToggleShakePanel}
        style={styles.panelClose()}
        type="button"
      >
        Close
      </button>

      <span>Shake it off!</span>
      <p>When you shake your phone, we set random colors to your pallete!</p>
    </div>
  </div>
)

ShakePanel.propTypes = {
  onClickToggleShakePanel: React.PropTypes.func.isRequired,
}

export default ShakePanel;
