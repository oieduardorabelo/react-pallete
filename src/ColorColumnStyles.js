const ColorColumnStyles = {
  row() {
    return {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      justifyContent: 'center',
    }
  },
  label() {
    return {
      backgroundColor: 'transparent',
      border: 0,
      color: '#FFFFFF',
      opacity: 0.75,
      textAlign: 'center',
      textTransform: 'uppercase',
    }
  },
  panel() {
    return {
      animation: 'slideIn 100ms linear',
      backgroundColor: '#FFFFFF',
      bottom: 0,
      display: 'none',
      flexDirection: 'column',
      left: 0,
      padding: 20,
      position: 'fixed',
      right: 0,
      zIndex: 2,
    }
  },
  panelOverlay() {
    return {
      animation: 'fadeIn 160ms linear',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      display: 'none',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1,
    }
  },
  inputSliders() {
    return {
      marginBottom: 5,
      marginTop: 5,
      maxWidth: '100%',
    }
  },
  panelDisplay() {
    return {
      height: 20,
      marginBottom: 20,
      marginTop: 10,
    }
  },
  panelClose() {
    return {
      alignSelf: 'flex-end'
    }
  }
}

export default ColorColumnStyles;
