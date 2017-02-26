import React from 'react';

import { api, store } from '../../domain';

const LOADING_TIME = 2000;

function FetchPallete(Component) {
  return class FetchPallete extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        sequence: [],
        pallete: {},
      }
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
      }

      setTimeout(() => {
        this.setState({
          isLoading: false,
          pallete,
          sequence,
        }, api.save({ sequence, pallete }));
      }, LOADING_TIME);
    }

    render() {
      return (
        <Component
          isLoading={this.state.isLoading}
          sequence={this.state.sequence}
          pallete={this.state.pallete}
        />
      )
    }
  }
}

export default FetchPallete;
