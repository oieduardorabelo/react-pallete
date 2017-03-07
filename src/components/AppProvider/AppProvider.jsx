import { Component, PropTypes, Children } from 'react';

class AppProvider extends Component {
  getChildContext() {
    return {
      api: this.api,
      store: this.store,
    }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store;
    this.api = props.api;
  }

  render() {
    return Children.only(this.props.children);
  }
}

AppProvider.propTypes = {
  api: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
  store: PropTypes.shape({}).isRequired,
}

AppProvider.childContextTypes = {
  api: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({}).isRequired,
}

export default AppProvider;
