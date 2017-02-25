//
// cherry picked from:
// https://codepen.io/jonitrythall/pen/dNJRRK
//
import React from 'react';

import styles from './LoaderStyles';

const animation = ['01', '02', '03', '04', '05', '06', '07', '08', '09','10'];

const Loader = () => (
  <div style={styles.container}>
    <div style={styles.containerSvg}>
      {animation.map(key => (
        <svg key={key} style={styles.svg} height='80' width='210'>
          <ellipse
            cx='25'
            cy='20'
            fill='none'
            rx='10' ry='10'
            style={styles[`ellipse${key}`]}
          />
        </svg>
      ))}
    </div>
  </div>
)

export default Loader;
