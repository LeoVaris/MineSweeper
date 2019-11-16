import React, {Component} from 'react';
import Grid from './Grid';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      key: 0,
    }
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  Restart = () => {
    let {key} = this.state;
    key++;
    this.setState({key: key})
  }
  
  render() {
    const {key} = this.state;
    return (
      <>
        <button onClick={this.Restart}>
            Restart
        </button>
        <div key={key}>
          <Grid
            onRef={ref => (this.child = ref)}
            width={30}
            height={16}
            mineCount={99}
          ></Grid>
        </div>
        
      </>
    );
  }
}
