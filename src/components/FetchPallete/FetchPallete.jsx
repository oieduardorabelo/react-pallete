import React from 'react';

import { api, store } from '../../domain';

import Loader from '../Loader/Loader';

const LOADING_TIME = 2000;

function FetchPallete(Component) {
  return class FetchPallete extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        pallete: {},
        sequence: [],
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
}

export default FetchPallete;
