import React from 'react';
import ColorColumn from './ColorColumn';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'relative',
    width: '100vw'
  },
};

const App = () => (
  <div style={styles.container}>
    <ColorColumn />
    <ColorColumn />
    <ColorColumn />
    <ColorColumn />
    <ColorColumn />
  </div>
)

export default App;
