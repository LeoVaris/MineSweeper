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
        width={30}
        height={30}
        mineCount={0}
      ></Grid>
    );
  }
}
