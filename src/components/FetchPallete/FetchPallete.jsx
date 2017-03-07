import React from 'react';

import Loader from '../Loader/Loader';

const LOADING_TIME = 2000;

function FetchPallete(Component) {
  class FetchPallete extends React.Component {
    constructor(props, context) {
      super(props);

      this.store = context.store;
      this.api = context.api;

      this.state = {
        isLoading: true,
        pallete: {},
        sequence: [],
      }
    }

    componentDidMount() {
      const loadData = this.api.getAll();
      let pallete = {};
      let sequence = {};

      if (loadData) {
        pallete = Object.assign({}, loadData.pallete);
        sequence = [...loadData.sequence];
      } else {
        pallete = Object.assign({}, this.store);
        sequence = Object.keys(pallete);
      }

      setTimeout(() => {
        this.setState({
          isLoading: false,
          pallete,
          sequence,
        }, this.api.save({ sequence, pallete }));
      }, LOADING_TIME);
    }

    render() {
      const {isLoading} = this.state;

      if (isLoading) {
        return <Loader />
      }

      return (
        <Component
          pallete={this.state.pallete}
          sequence={this.state.sequence}
        />
      )
    }
  }

  FetchPallete.contextTypes = {
    store: React.PropTypes.object.isRequired,
    api: React.PropTypes.object.isRequired,
  }

  return FetchPallete;
}

export default FetchPallete;
