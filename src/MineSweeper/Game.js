import React, {Component} from 'react';
import Grid from './Grid';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({loading: false});
  }
  
  render() {
    return (
      <Grid
        width={10}
        height={10}
      ></Grid>
    );
  }
}
